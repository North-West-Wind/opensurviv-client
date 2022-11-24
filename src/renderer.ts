import { getPlayer, getEntities, getObjects, getSize } from "./game";
import { drawHealth } from "./rendering/hud";
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
			const scale = Math.max(canvas.width, canvas.height) / (40 * player.scope);
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = canvas.width / 200;
			const size = getSize();
			ctx.strokeRect(canvas.width / 2 - (player.position.x + player.hitbox.comparable) * scale, canvas.height / 2 - (player.position.y + player.hitbox.comparable) * scale, (size[0] + player.hitbox.comparable * 2) * scale, (size[1] + player.hitbox.comparable * 2) * scale);
			const interval = 20;
			ctx.lineWidth /= 2;
			ctx.globalAlpha = 0.2;
			for (let ii = 0; ii <= size[0]; ii += interval) lineBetween(ctx, canvas.width / 2 - (player.position.x - ii) * scale, 0, canvas.width / 2 - (player.position.x - ii) * scale, canvas.height);
			for (let ii = 0; ii <= size[1]; ii += interval) lineBetween(ctx, 0, canvas.height / 2 - (player.position.y - ii) * scale, canvas.width, canvas.height / 2 - (player.position.y - ii) * scale);
			ctx.globalAlpha = 1;
	
			var combined: (Entity | GameObject)[] = [];
			combined = combined.concat(getEntities(), getObjects());
			combined.push(player);

			combined.sort((a, b) => a.zIndex - b.zIndex).forEach(thing => thing.render(player, canvas, ctx, scale));
	
			drawHealth(player, canvas, ctx);
		}
	} catch (err) { console.error(err); }

	if (running) requestAnimationFrame(animate);
}