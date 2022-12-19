import { GRID_INTERVAL, MINIMAP_SIZE } from "../constants";
import { getPlayer, getSize } from "../game";
import { isBigMap } from "../states";
import { Player } from "../store/entities";
import { circleFromCenter, lineBetween } from "../utils";

const mapCanvas = document.createElement("canvas");
var mapCtx: CanvasRenderingContext2D;
var constScale: number;

const tmpCanvas = document.createElement("canvas");

export function getMapCanvas() { return mapCanvas; }
export function getMapCtx() { return mapCtx; }

export function initMap() {
	const size = getSize();
	const maxSide = Math.max(...size);
	const minScreen = Math.min(window.screen.availWidth, window.screen.availHeight);
	mapCanvas.width = minScreen * size[0] / maxSide;
	mapCanvas.height = minScreen * size[1] / maxSide;
	constScale = minScreen / maxSide;
	mapCtx = <CanvasRenderingContext2D> mapCanvas.getContext("2d");
	mapCtx.fillStyle = "#80B251";
	mapCtx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

	mapCtx.strokeStyle = "#000000";
	mapCtx.lineWidth = 1;
	mapCtx.globalAlpha = 0.2;
	for (let ii = 0; ii <= size[0]; ii += GRID_INTERVAL) lineBetween(mapCtx, ii * minScreen / maxSide, 0, ii * minScreen / maxSide, mapCanvas.height);
	for (let ii = 0; ii <= size[1]; ii += GRID_INTERVAL) lineBetween(mapCtx, 0, ii * minScreen / maxSide, mapCanvas.width, ii * minScreen / maxSide);
	mapCtx.globalAlpha = 1;
}

export function drawMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	const scaleByWidth = canvas.width / mapCanvas.width;
	const scaleByHeight = canvas.height / mapCanvas.height;
	var width: number, height: number, scale: number;
	if (scaleByHeight * mapCanvas.width > canvas.width) {
		width = canvas.width;
		height = scaleByWidth * mapCanvas.height;
		scale = canvas.width / getSize()[0];
	} else {
		width = scaleByHeight * mapCanvas.width;
		height = canvas.height;
		scale = canvas.height / getSize()[1];
	}
	ctx.drawImage(mapCanvas, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.strokeRect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
	const player = <Player> getPlayer();
	ctx.fillStyle = "#F8C675";
	circleFromCenter(ctx, (canvas.width - width) / 2 + player.position.x * scale, (canvas.height - height) / 2 + player.position.y * scale, 8);
	circleFromCenter(ctx, (canvas.width - width) / 2 + player.position.x * scale, (canvas.height - height) / 2 + player.position.y * scale, 12, false, true);
}

export function drawMinimap(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	const size = MINIMAP_SIZE * constScale * (isBigMap() ? 1.5 : 1);
	const x = player.position.x * constScale - size / 2;
	const y = player.position.y * constScale - size / 2;
	const imageData = mapCtx.getImageData(x, y, size, size);
	tmpCanvas.width = tmpCanvas.height = size;
	tmpCanvas.getContext("2d")?.putImageData(imageData, 0, 0);
	const margin = canvas.width / 100;
	const side = canvas.width / (8 / (isBigMap() ? 1.5 : 1));
	ctx.drawImage(tmpCanvas, margin, canvas.height - margin - side, side, side);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.strokeRect(margin, canvas.height - margin - side, side, side);
	ctx.fillStyle = "#F8C675";
	circleFromCenter(ctx, margin + side / 2, canvas.height - margin - side / 2, 8);
	circleFromCenter(ctx, margin + side / 2, canvas.height - margin - side / 2, 12, false, true);
}