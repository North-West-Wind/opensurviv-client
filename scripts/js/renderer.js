/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};
const ctx = canvas.getContext("2d");
function animate() {
	ctx.fillStyle = "#80B251";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (player) {
		// 1 unit to x pixels
		const scale = Math.max(canvas.width, canvas.height) / (40 * player.scope);
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = canvas.width / 200;
		ctx.strokeRect(canvas.width / 2 - (player.position.x + player.hitbox.comparable()) * scale, canvas.height / 2 - (player.position.y + player.hitbox.comparable()) * scale, (size[0] + player.hitbox.comparable() * 2) * scale, (size[1] + player.hitbox.comparable() * 2) * scale);
		const interval = 20;
		ctx.lineWidth /= 2;
		ctx.globalAlpha = 0.2;
		for (let ii = 0; ii <= size[0]; ii += interval) lineBetween(ctx, canvas.width / 2 - (player.position.x - ii) * scale, 0, canvas.width / 2 - (player.position.x - ii) * scale, canvas.height);
		for (let ii = 0; ii <= size[1]; ii += interval) lineBetween(ctx, 0, canvas.height / 2 - (player.position.y - ii) * scale, canvas.width, canvas.height / 2 - (player.position.y - ii) * scale);
		ctx.globalAlpha = 1;

		drawPlayer(player, player, canvas, ctx, scale);
		entities.forEach(entity => {
			if (entity.type === "player") drawPlayer(player, entity, canvas, ctx, scale);
		});

		objects.forEach(object => {
			if (object.type === "tree") drawTree(player, object, canvas, ctx, scale);
		});

		drawHealth(player, canvas, ctx);
	}

	requestAnimationFrame(animate);
}

animate();