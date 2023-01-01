import { encode, decode } from "msgpack-lite";
import { KeyBind, movementKeys } from "./constants";
import { animate, setRunning } from "./renderer";
import { getMapCanvas, getMapCtx, initMap } from "./rendering/map";
import { addKeyPressed, addMousePressed, isKeyPressed, isMenuHidden, removeKeyPressed, removeMousePressed, toggleBigMap, toggleHud, toggleMap, toggleMenu, toggleMinimap } from "./states";
import { castCorrectEntity, Player } from "./store/entities";
import { castCorrectObstacle, castMinObstacle } from "./store/obstacles";
import { castCorrectTerrain } from "./store/terrains";
import { Vec2 } from "./types/math";
import { MinEntity, MinObstacle } from "./types/minimized";
import { Obstacle } from "./types/obstacle";
import { PingPacket, MovementPressPacket, MovementReleasePacket, MouseMovePacket, MousePressPacket, MouseReleasePacket, GamePacket, MapPacket, AckPacket } from "./types/packet";
import { RenderableMapLayerN1 } from "./types/render";
import { Terrain, World } from "./types/terrain";

export var world = new World();

var id: string | null;
var username: string | null;
var player: Player | null;

export function getId() { return id; }
export function getPlayer() { return player; }

var ws: WebSocket;
var connected = false;

function init(address: string) {
	// Address for debugging
	ws = new WebSocket("ws://" + address);
	ws.binaryType = "arraybuffer";

	ws.onmessage = (event) => {
		const data = <AckPacket> decode(new Uint8Array(event.data));
		id = data.id;
		world = new World(new Vec2(data.size[0], data.size[1]), castCorrectTerrain(data.terrain));
		ws.send(encode({ username, id }).buffer);
		connected = true;

		// Start animating after connection established
		setRunning(true);
		animate();
		document.getElementById("menu")?.classList.add("hidden");

		const interval = setInterval(() => {
			if (connected) ws.send(encode(new PingPacket()).buffer);
			else clearInterval(interval);
		}, 1000);

		ws.onmessage = (event) => {
			const data = decode(new Uint8Array(event.data));
			switch (data.type) {
				case "game":
					const gamePkt = <GamePacket>data;
					world.entities = gamePkt.entities.map((entity: MinEntity) => castCorrectEntity(entity));
					world.obstacles = gamePkt.obstacles.map((obstacle: MinObstacle) => castCorrectObstacle(obstacle));
					player = new Player(gamePkt.player);
					break;
				case "map":
					// This should happen once only normally
					const mapPkt = <MapPacket>data;
					initMap();
					const mapCanvas = getMapCanvas();
					const mapCtx = getMapCtx();
					const scale = mapCanvas.width / world.size.x;
					// Draw terrains on map, -ve layer -> layer 0
					world.terrains = mapPkt.terrains.map(ter => castCorrectTerrain(ter));
					(<(Terrain & RenderableMapLayerN1)[]> world.terrains.filter((terrain: any) => !!terrain["renderMapLayerN1"])).forEach(terrain => terrain.renderMapLayerN1(mapCanvas, mapCtx, scale));
					world.terrains.forEach(terrain => terrain.renderMap(mapCanvas, mapCtx, scale));
					// Draw obstacles on map, -ve layer -> layer 0
					const obstacles = mapPkt.obstacles.map(obs => castCorrectObstacle(castMinObstacle(obs))).sort((a, b) => a.zIndex - b.zIndex);
					(<(Obstacle & RenderableMapLayerN1)[]> obstacles.filter((obstacle: any) => !!obstacle["renderMapLayerN1"])).forEach(obstacle => obstacle.renderMapLayerN1(mapCanvas, mapCtx, scale));
					obstacles.forEach(obstacle => obstacle.renderMap(mapCanvas, mapCtx, scale));
					break;
			}
		}
	}

	// Reset everything when connection closes
	ws.onclose = () => {
		connected = false;
		setRunning(false);
		document.getElementById("menu")?.classList.remove("hidden");
		id = null;
		username = null;
		player = null;
		world = new World();
	}
}

document.getElementById("connect")?.addEventListener("click", () => {
	username = (<HTMLInputElement>document.getElementById("username")).value;
	init((<HTMLInputElement>document.getElementById("address")).value);
});

document.getElementById("disconnect")?.addEventListener("click", () => {
	ws.close();
	document.getElementById("settings")?.classList.add("hidden");
	toggleMenu();
});

window.onkeydown = (event) => {
	if (!connected || isKeyPressed(event.key)) return;
	event.stopPropagation();
	addKeyPressed(event.key);
	const settingsElem = document.getElementById("settings");
	if (event.key == KeyBind.MENU) {
		if (isMenuHidden()) settingsElem?.classList.remove("hidden");
		else settingsElem?.classList.add("hideen");
		toggleMenu();
	} else if (event.key == KeyBind.HIDE_HUD) toggleHud();
	else if (event.key == KeyBind.WORLD_MAP) toggleMap();
	else if (event.key == KeyBind.HIDE_MAP) toggleMinimap();
	else if (event.key == KeyBind.BIG_MAP) toggleBigMap();
	if (isMenuHidden()) {
		const index = movementKeys.indexOf(event.key);
		if (index >= 0)
			ws.send(encode(new MovementPressPacket(index)).buffer);
	}
}

window.onkeyup = (event) => {
	if (!connected) return;
	event.stopPropagation();
	removeKeyPressed(event.key);
	const index = movementKeys.indexOf(event.key);
	if (index >= 0)
		ws.send(encode(new MovementReleasePacket(index)).buffer);
}

window.onmousemove = (event) => {
	if (!connected) return;
	event.stopPropagation();
	ws.send(encode(new MouseMovePacket(event.x - window.innerWidth / 2, event.y - window.innerHeight / 2)).buffer);
}

window.onmousedown = (event) => {
	if (!connected) return;
	event.stopPropagation();
	addMousePressed(event.button);
	ws.send(encode(new MousePressPacket(event.button)));
}

window.onmouseup = (event) => {
	if (!connected) return;
	event.stopPropagation();
	removeMousePressed(event.button);
	ws.send(encode(new MouseReleasePacket(event.button)));
}
// /** @param {MouseEvent} event */
// window.oncontextmenu = (event) => {
// 	if (!connected) return;
// 	ws.send(encode(new PingPacket(event.button)))
// }