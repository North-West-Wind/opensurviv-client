import { Player } from "../store/entities";
import { Inventory } from "../types/entity";
import { roundRect } from "../utils";

// Calls all the HUD related functions
export function drawHud(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	drawHealth(player, canvas, ctx);
	drawInventory(player, canvas, ctx);
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

// Draws the player's inventory (temporary)
function drawInventory(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = "#fff";
	ctx.font = `${canvas.height / 27}px Arial`;
	ctx.textBaseline = "bottom";
	ctx.textAlign = "end";
	const inventory = <Inventory>player.inventory;
	var str = "";
	for (let ii = 0; ii < inventory.weapons.length; ii++) {
		if (!inventory.weapons[ii]) continue;
		if (ii != 0) str += " ";
		if (ii == inventory.holding) str += `[${inventory.weapons[ii].name}]`;
		else str += inventory.weapons[ii].name;
	}
	ctx.fillText(str, canvas.width * 191/192, canvas.height - canvas.width / 192);
}
