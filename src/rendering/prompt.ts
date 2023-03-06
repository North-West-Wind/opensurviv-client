export function drawPrompt(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
	drawInteract(canvas, ctx, scale);
}

function drawInteract(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
	ctx.fillStyle = "#fff";
	ctx.font = `${canvas.height / 27}px Arial`;
	ctx.textBaseline = "top";
	ctx.textAlign = "center";
	ctx.fillText("Interact", canvas.width / 2, canvas.height / 2 + 1.5 * scale);
}