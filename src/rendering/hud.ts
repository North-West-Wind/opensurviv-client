import { Player } from "../store/entities";
import { roundRect } from "../utils";

// Calls all the HUD related functions
export function drawHud(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	drawHealth(player, canvas, ctx);
}

// Draws the player's health
function drawHealth(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	const width = canvas.width / 4;
	const height = canvas.height / 20;
	const padding = Math.min(canvas.width, canvas.height) / 100;
	const innerWidth = width - padding * 2;
	const innerHeight = height - padding * 2;
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.2;
	roundRect(ctx, (canvas.width - width) / 2, canvas.height - height - padding, width, height, padding / 2);
	if (player.health == player.maxHealth) ctx.fillStyle = "#ccc";
	else if (player.health / player.maxHealth < 0.8) ctx.fillStyle = "#fdd";
	else if (player.health / player.maxHealth < 0.25) ctx.fillStyle = "#daa";
	else ctx.fillStyle = "#fff";
	ctx.globalAlpha = 1;
	roundRect(ctx, (canvas.width - innerWidth) / 2, canvas.height - height, innerWidth * player.health / player.maxHealth, innerHeight, padding / 2);
}