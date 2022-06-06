/**
 * Draws the player's health
 * @param {Player} player 
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawHealth(player, canvas, ctx) {
	const width = canvas.width / 4;
	const height = canvas.height / 20;
	const padding = Math.min(canvas.width, canvas.height) / 100;
	const innerWidth = width - padding * 2;
	const innerHeight = height - padding * 2;
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.2;
	roundRect(ctx, (canvas.width - width) / 2, canvas.height - height - padding, width, height, padding / 2);
	ctx.fillStyle = "#ffffff";
	ctx.globalAlpha = 1;
	roundRect(ctx, (canvas.width - innerWidth) / 2, canvas.height - height, innerWidth * player.health / player.maxHealth, innerHeight, padding / 2);
}