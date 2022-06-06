/**
 * Promisified setTimeout
 * @param {number} ms 
 * @returns {Promise<void>}
 */
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
/**
 * Capping value with limits
 * @param {number} val 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function clamp(val, min, max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}
/**
 * Draws circle with canvas
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {boolean} fill 
 * @param {boolean} stroke 
 */
function circle(ctx, x, y, radius, fill = true, stroke = false) {
	ctx.beginPath();
	ctx.arc(x + radius, y + radius, radius, 0, 2*Math.PI, false);
	if (fill) ctx.fill();
	if (stroke) ctx.stroke();
}
/**
 * Draws circle with x, y center
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {boolean} fill 
 * @param {boolean} stroke 
 */
function circleFromCenter(ctx, x, y, radius, fill = true, stroke = false) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI, false);
	if (fill) ctx.fill();
	if (stroke) ctx.stroke();
}
/**
 * Strokes a line between (x1, y1) and (x2, y2)
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 */
function lineBetween(ctx, x1, y1, x2, y2, stroke = true) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	if (stroke) ctx.stroke();
}
/**
 * Draws a rounded rectangle
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number | { tl?: number, tr?: number, br?: number, bl?: number }} radius 
 * @param {boolean} fill 
 * @param {boolean} stroke 
 */
function roundRect(ctx, x, y, width, height, radius, fill = true, stroke = false) {
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	var tl, tr, bl, br;
	if (typeof radius === 'number') tl = tr = bl = br = radius;
	else {
		tl = radius.tl || 0;
		tr = radius.tr || 0;
		br = radius.br || 0;
		bl = radius.bl || 0;
	}
	ctx.beginPath();
	ctx.moveTo(x + tl, y);
	ctx.lineTo(x + width - tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + tr);
	ctx.lineTo(x + width, y + height - br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - br, y + height);
	ctx.lineTo(x + bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - bl);
	ctx.lineTo(x, y + tl);
	ctx.quadraticCurveTo(x, y, x + tl, y);
	ctx.closePath();
	if (fill) ctx.fill();
	if (stroke) ctx.stroke();
}
/**
 * Converts radian to degrees
 * @param {number} radian 
 * @returns 
 */
function toDegrees(radian) {
	return radian * 180 / Math.PI;
}