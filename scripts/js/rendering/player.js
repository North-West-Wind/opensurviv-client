/**
 * Renders a player
 * @param {Player} you 
 * @param {Player} other 
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} scale
 */
function drawPlayer(you, other, canvas, ctx, scale) {
	const relative = other.position.addVec(you.position.inverse());
	const radius = scale * other.hitbox.radius;
	ctx.fillStyle = "#F8C675";
	circleFromCenter(ctx, canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale, radius);
	const fists = [other.direction.addAngle(COMMON_ANGLES.PI_FOUR).scaleAll(radius * 1.2), other.direction.addAngle(-COMMON_ANGLES.PI_FOUR).scaleAll(radius * 1.2)];
	const fistRadius = radius / 3;
	ctx.lineWidth = fistRadius / 3;
	ctx.strokeStyle = "#000000";
	for (const fist of fists) circleFromCenter(ctx, canvas.width / 2 + relative.x * scale + fist.x, canvas.height / 2 + relative.y * scale + fist.y, fistRadius, true, true);
}