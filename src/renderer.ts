import { GRID_INTERVAL } from "./constants";
import { getPlayer, getEntities, getObjects, getSize } from "./game";
import { drawHud } from "./rendering/hud";
import { drawMap } from "./rendering/map";
import { isHudHidden, isMapOpened } from "./states";
import { Entity } from "./types/entities";
import { GameObject } from "./types/objects";
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
		ctx.fillStyle = "#80B251";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		const player = getPlayer();
		if (player) {
			// 1 unit to x pixels
			const scale = Math.max(canvas.width, canvas.height) / (20 + 20 * player.scope);
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = scale / 4;
			const size = getSize();
			const x = canvas.width / 2 - player.position.x * scale;
			const y = canvas.height / 2 - player.position.y * scale;
			const width = size[0] * scale;
			const height = size[1] * scale;
			ctx.strokeRect(x, y, width, height);
			ctx.globalAlpha = 0.2;
			for (let ii = 0; ii <= size[0]; ii += GRID_INTERVAL) lineBetween(ctx, canvas.width / 2 - (player.position.x - ii) * scale, Math.max(y, 0), canvas.width / 2 - (player.position.x - ii) * scale, Math.min(y + height, canvas.height));
			for (let ii = 0; ii <= size[1]; ii += GRID_INTERVAL) lineBetween(ctx, Math.max(x, 0), canvas.height / 2 - (player.position.y - ii) * scale, Math.min(x + width, canvas.width), canvas.height / 2 - (player.position.y - ii) * scale);
			ctx.globalAlpha = 1;
	
			var combined: (Entity | GameObject)[] = [];
			combined = combined.concat(getEntities(), getObjects());
			combined.push(player);

			combined.sort((a, b) => a.zIndex - b.zIndex).forEach(thing => thing.render(player, canvas, ctx, scale));
	
			if (!isHudHidden()) drawHud(player, canvas, ctx);
			if (isMapOpened()) drawMap(canvas, ctx);
		}
	} catch (err) { console.error(err); }

	if (running) requestAnimationFrame(animate);
}