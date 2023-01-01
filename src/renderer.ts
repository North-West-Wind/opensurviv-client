import { GRID_INTERVAL } from "./constants";
import { getPlayer, world } from "./game";
import { drawHud } from "./rendering/hud";
import { drawMap, drawMinimap } from "./rendering/map";
import { isHudHidden, isMapHidden, isMapOpened } from "./states";
import { Entity } from "./types/entity";
import { Obstacle } from "./types/obstacle";
import { RenderableLayerN1 } from "./types/render";
import { Terrain } from "./types/terrain";
import { lineBetween } from "./utils";

const canvas = <HTMLCanvasElement> document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

var running = false;
export function setRunning(r: boolean) { running = r; }

const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
export function animate() {
	// Don't panic when drawing error
	try {
		// Fill canvas with default terrain color
		ctx.fillStyle = world.defaultTerrain.colorToHex();
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		const player = getPlayer();
		if (player) {
			// 1 unit to x pixels
			const scale = Math.max(canvas.width, canvas.height) / (20 + 20 * player.scope);
			const size = world.size;
			const x = canvas.width / 2 - player.position.x * scale;
			const y = canvas.height / 2 - player.position.y * scale;
			const width = size.x * scale;
			const height = size.y * scale;
			// Draw world border
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = scale / 4;
			ctx.strokeRect(x, y, width, height);
			// Draw grid lines
			ctx.globalAlpha = 0.2;
			for (let ii = 0; ii <= size.x; ii += GRID_INTERVAL) lineBetween(ctx, canvas.width / 2 - (player.position.x - ii) * scale, Math.max(y, 0), canvas.width / 2 - (player.position.x - ii) * scale, Math.min(y + height, canvas.height));
			for (let ii = 0; ii <= size.y; ii += GRID_INTERVAL) lineBetween(ctx, Math.max(x, 0), canvas.height / 2 - (player.position.y - ii) * scale, Math.min(x + width, canvas.width), canvas.height / 2 - (player.position.y - ii) * scale);
			ctx.globalAlpha = 1;

			// Draw terrains
			// Do negative layer first
			(<(Terrain & RenderableLayerN1)[]> world.terrains.filter((terrain: any) => !!terrain["renderLayerN1"])).forEach(terrain => terrain.renderLayerN1(player, canvas, ctx, scale));
			// Do layer zero
			world.terrains.forEach(terrain => terrain.render(player, canvas, ctx, scale));
			
			// Draw obstacles and entities
			var combined: (Entity | Obstacle)[] = [];
			combined = combined.concat(world.entities, world.obstacles);
			combined.push(player);
			// Sort them by zIndex. Higher = Above
			combined = combined.sort((a, b) => a.zIndex - b.zIndex);
			// Do negative layer first
			(<((Entity | Obstacle) & RenderableLayerN1)[]> combined.filter((entOrObs: any) => !!entOrObs["renderLayerN1"])).forEach(entOrObs => entOrObs.renderLayerN1(player, canvas, ctx, scale));
			// Do layer zero
			combined.forEach(thing => thing.render(player, canvas, ctx, scale));
	
			// Draw overlays
			if (!isHudHidden()) drawHud(player, canvas, ctx);
			if (isMapOpened()) drawMap(canvas, ctx);
			else if (!isMapHidden()) drawMinimap(player, canvas, ctx);
		}
	} catch (err) { console.error(err); }

	if (running) requestAnimationFrame(animate);
}