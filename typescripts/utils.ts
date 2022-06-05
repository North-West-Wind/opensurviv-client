// Promisified setTimeout
export function wait(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
// Capping value with limits
export function clamp(val: number, min: number, max: number) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}
// Draw circle with canvas
export function circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: boolean = true, stroke: boolean = false) {
	ctx.beginPath();
	ctx.arc(x + radius, y + radius, radius, 0, 2*Math.PI, false);
	if (fill) ctx.fill();
	if (stroke) ctx.stroke();
}
// Draw circle with x, y center
export function circleFromCenter(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: boolean = true, stroke: boolean = false) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI, false);
	if (fill) ctx.fill();
	if (stroke) ctx.stroke();
}