import { GRID_INTERVAL, MINIMAP_SIZE } from "../constants";
import { getPlayer, world } from "../game";
import { isBigMap } from "../states";
import { FullPlayer } from "../store/entities";
import { Obstacle } from "../types/obstacle";
import { RenderableMapLayerN1 } from "../types/extenstions";
import { Terrain } from "../types/terrain";
import { circleFromCenter, lineBetween } from "../utils";

const mapCanvas = document.createElement("canvas");
var mapCtx: CanvasRenderingContext2D;
var constScale: number;

const tmpCanvas = document.createElement("canvas");

// Initialize the map when MapPacket is received
export function initMap(obstacles: Obstacle[]) {
	// Determine the dimension
	const size = world.size;
	const maxSide = Math.max(size.x, size.y);
	const minScreen = Math.min(window.screen.availWidth, window.screen.availHeight);
	mapCanvas.width = minScreen * size.x / maxSide;
	mapCanvas.height = minScreen * size.y / maxSide;
	constScale = minScreen / maxSide;
	const scale = mapCanvas.width / world.size.x;
	mapCtx = <CanvasRenderingContext2D> mapCanvas.getContext("2d");

	// Fill map background
	mapCtx.fillStyle = world.defaultTerrain.colorToHex();
	mapCtx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

	// Draw terrains on map, -ve layer -> layer 0
	(<(Terrain & RenderableMapLayerN1)[]> world.terrains.filter((terrain: any) => !!terrain["renderMapLayerN1"])).forEach(terrain => terrain.renderMapLayerN1(mapCanvas, mapCtx, scale));
	world.terrains.forEach(terrain => terrain.renderMap(mapCanvas, mapCtx, scale));

	// Draw the grid
	mapCtx.strokeStyle = "#000000";
	mapCtx.lineWidth = 1;
	mapCtx.globalAlpha = 0.2;
	for (let ii = 0; ii <= size.x; ii += GRID_INTERVAL) lineBetween(mapCtx, ii * minScreen / maxSide, 0, ii * minScreen / maxSide, mapCanvas.height);
	for (let ii = 0; ii <= size.y; ii += GRID_INTERVAL) lineBetween(mapCtx, 0, ii * minScreen / maxSide, mapCanvas.width, ii * minScreen / maxSide);
	mapCtx.globalAlpha = 1;
	
	// Draw obstacles on map, -ve layer -> layer 0
	obstacles = obstacles.sort((a, b) => a.zIndex - b.zIndex);
	(<(Obstacle & RenderableMapLayerN1)[]> obstacles.filter((obstacle: any) => !!obstacle["renderMapLayerN1"])).forEach(obstacle => obstacle.renderMapLayerN1(mapCanvas, mapCtx, scale));
	obstacles.forEach(obstacle => obstacle.renderMap(mapCanvas, mapCtx, scale));
}

// Draw world map
export function drawMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	// Determine the dimension
	const scaleByWidth = canvas.width / mapCanvas.width;
	const scaleByHeight = canvas.height / mapCanvas.height;
	var width: number, height: number, scale: number;
	if (scaleByHeight * mapCanvas.width > canvas.width) {
		width = canvas.width;
		height = scaleByWidth * mapCanvas.height;
		scale = canvas.width / world.size.x;
	} else {
		width = scaleByHeight * mapCanvas.width;
		height = canvas.height;
		scale = canvas.height / world.size.y;
	}
	// Draw pre-rendered map
	ctx.drawImage(mapCanvas, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
	// Draw border around map
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.strokeRect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
	// Draw player icon
	const player = <FullPlayer> getPlayer();
	ctx.fillStyle = "#F8C675";
	circleFromCenter(ctx, (canvas.width - width) / 2 + player.position.x * scale, (canvas.height - height) / 2 + player.position.y * scale, 8);
	circleFromCenter(ctx, (canvas.width - width) / 2 + player.position.x * scale, (canvas.height - height) / 2 + player.position.y * scale, 12, false, true);
}

// Draw minimap
export function drawMinimap(player: FullPlayer, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	// Determine the dimension
	const size = MINIMAP_SIZE * constScale * (isBigMap() ? 1.5 : 1);
	const x = player.position.x * constScale - size / 2;
	const y = player.position.y * constScale - size / 2;
	const imageData = mapCtx.getImageData(x, y, size, size);
	tmpCanvas.width = tmpCanvas.height = size;
	tmpCanvas.getContext("2d")?.putImageData(imageData, 0, 0);
	const margin = canvas.width / 100;
	const side = canvas.width / (8 / (isBigMap() ? 1.5 : 1));
	// Fill map background
	ctx.fillStyle = world.defaultTerrain.colorToHex();
	ctx.fillRect(margin, canvas.height - margin - side, side, side);
	// Draw pre-rendered map
	ctx.drawImage(tmpCanvas, margin, canvas.height - margin - side, side, side);
	// Draw border around map
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.strokeRect(margin, canvas.height - margin - side, side, side);
	// Draw the player icon
	ctx.fillStyle = "#F8C675";
	circleFromCenter(ctx, margin + side / 2, canvas.height - margin - side / 2, 8);
	circleFromCenter(ctx, margin + side / 2, canvas.height - margin - side / 2, 12, false, true);
}