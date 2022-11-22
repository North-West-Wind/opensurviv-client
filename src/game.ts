import { encode, decode } from "msgpack-lite";
import { animate, setRunning } from "./renderer";
import { castCorrectEntity, Player } from "./store/entities";
import { castCorrectObject } from "./store/objects";
import { Entity } from "./types/entities";
import { MinEntity, MinGameObject } from "./types/minimized";
import { GameObject } from "./types/objects";
import { PingPacket, MovementPressPacket, MovementReleasePacket, MouseMovePacket, MousePressPacket, MouseReleasePacket, GamePacket, MapPacket } from "./types/packets";

var id: string | null;
var username: string | null;
var size: number[] = [];
var player: Player | null;
var entities: Entity[] = [];
var objects: GameObject[] = [];

export function getId() { return id; }
export function getSize() { return size; }
export function getPlayer() { return player; }
export function getEntities() { return entities; }
export function getObjects() { return objects; }

var ws: WebSocket;
var connected = false;

function init(address: string) {
	// Address for debugging
	ws = new WebSocket("ws://" + address);
	ws.binaryType = "arraybuffer";
	
	ws.onmessage = (event) => {
		const data = decode(new Uint8Array(event.data));
		id = data.id;
		size = data.size;
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
					const gamePkt = <GamePacket> data;
					entities = gamePkt.entities.map((entity: MinEntity) => castCorrectEntity(entity));
					objects = gamePkt.objects.map((object: MinGameObject) => castCorrectObject(object));
					player = new Player(gamePkt.player);
					break;
				case "map":
					const mapPkt = <MapPacket> data;
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
		size = [];
		player = null;
		entities = [];
		objects = [];
	}
}

document.getElementById("connect")?.addEventListener("click", () => {
	username = (<HTMLInputElement> document.getElementById("username")).value;
	init((<HTMLInputElement> document.getElementById("address")).value);
});

document.getElementById("disconnect")?.addEventListener("click", () => {
	ws.close();
	document.getElementById("settings")?.classList.add("hidden");
});

const movementKeys = ["d", "w", "a", "s"];
const movementSent = [false, false, false, false];
window.onkeydown = (event) => {
	if (!connected) return;
	const settingsElem = document.getElementById("settings");
	if (event.key == "Escape") {
		if (settingsElem?.classList.contains("hidden")) settingsElem.classList.remove("hidden");
		else settingsElem?.classList.add("hideen");
	}
	if (settingsElem?.classList.contains("hidden")) {
		const index = movementKeys.indexOf(event.key);
		if (index >= 0 && !movementSent[index]) {
			ws.send(encode(new MovementPressPacket(index)).buffer);
			movementSent[index] = true;
		}
	}
}

window.onkeyup = (event) => {
	if (!connected) return;
	const index = movementKeys.indexOf(event.key);
	if (index >= 0) {
		ws.send(encode(new MovementReleasePacket(index)).buffer);
		movementSent[index] = false;
	}
}

window.onmousemove = (event) => {
	if (!connected) return;
	ws.send(encode(new MouseMovePacket(event.x - window.innerWidth / 2, event.y - window.innerHeight / 2)).buffer);
}

window.onmousedown = (event) => {
	if (!connected) return;
	ws.send(encode(new MousePressPacket(event.button)));
}

window.onmouseup = (event) => {
	if (!connected) return;
	ws.send(encode(new MouseReleasePacket(event.button)));
}
// /** @param {MouseEvent} event */
// window.oncontextmenu = (event) => {
// 	if (!connected) return;
// 	ws.send(encode(new PingPacket(event.button)))
// }