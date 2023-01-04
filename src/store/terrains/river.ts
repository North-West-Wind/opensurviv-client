import { Line } from "../../types/math";
import { MinTerrain, MinLine, MinVec2 } from "../../types/minimized";
import { RenderableLayerN1, RenderableMapLayerN1 } from "../../types/render";
import { LineTerrain, PiecewiseTerrain } from "../../types/terrain";
import { Player } from "../entities";

export class RiverSegment extends LineTerrain implements RenderableLayerN1, RenderableMapLayerN1 {
	id = "river_segment";
	color = 0xFF3481ab;
	secondaryColor = 0xFF905e26;

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.scale(scale, scale);
		ctx.translate(-you.position.x, -you.position.y);
		const lines = this.line.toParallel(this.range, false);
		const start = new Line(this.line.a, this.boundary.start.addVec(this.line.a), false);
		const end = new Line(this.line.b, this.boundary.end.addVec(this.line.b), false);
		const a = lines[0].intersection(start);
		if (!a) return;
		const b = lines[0].intersection(end);
		if (!b) return;
		const c = lines[1].intersection(end);
		if (!c) return;
		const d = lines[1].intersection(start);
		if (!d) return;
		ctx.fillStyle = this.colorToHex();
		ctx.beginPath();
		ctx.moveTo(a.x - 1/scale, a.y - 1/scale);
		ctx.lineTo(b.x, b.y);
		ctx.lineTo(c.x, c.y);
		ctx.lineTo(d.x - 1/scale, d.y - 1/scale);
		ctx.closePath();
		ctx.fill();
		ctx.resetTransform();
	}

	renderMap(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.scale(scale, scale);
		const lines = this.line.toParallel(this.range, false);
		const start = new Line(this.line.a, this.boundary.start.addVec(this.line.a), false);
		const end = new Line(this.line.b, this.boundary.end.addVec(this.line.b), false);
		const a = lines[0].intersection(start);
		if (!a) return;
		const b = lines[0].intersection(end);
		if (!b) return;
		const c = lines[1].intersection(end);
		if (!c) return;
		const d = lines[1].intersection(start);
		if (!d) return;
		ctx.fillStyle = this.colorToHex();
		ctx.beginPath();
		ctx.moveTo(a.x - 1/scale, a.y - 1/scale);
		ctx.lineTo(b.x, b.y);
		ctx.lineTo(c.x, c.y);
		ctx.lineTo(d.x - 1/scale, d.y - 1/scale);
		ctx.closePath();
		ctx.fill();
		ctx.resetTransform();
	}

	renderLayerN1(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.scale(scale, scale);
		ctx.translate(-you.position.x, -you.position.y);
		const lines = this.line.toParallel(this.range + this.border, false);
		const start = new Line(this.line.a, this.boundary.start.addVec(this.line.a), false);
		const end = new Line(this.line.b, this.boundary.end.addVec(this.line.b), false);
		const a = lines[0].intersection(start);
		if (!a) return;
		const b = lines[0].intersection(end);
		if (!b) return;
		const c = lines[1].intersection(end);
		if (!c) return;
		const d = lines[1].intersection(start);
		if (!d) return;
		ctx.fillStyle = this.colorToHex(this.secondaryColor);
		ctx.beginPath();
		ctx.moveTo(a.x - 1/scale, a.y - 1/scale);
		ctx.lineTo(b.x, b.y);
		ctx.lineTo(c.x, c.y);
		ctx.lineTo(d.x - 1/scale, d.y - 1/scale);
		ctx.closePath();
		ctx.fill();
		ctx.resetTransform();
	}

	renderMapLayerN1(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.scale(scale, scale);
		const lines = this.line.toParallel(this.range + this.border, false);
		const start = new Line(this.line.a, this.boundary.start.addVec(this.line.a), false);
		const end = new Line(this.line.b, this.boundary.end.addVec(this.line.b), false);
		const a = lines[0].intersection(start);
		if (!a) return;
		const b = lines[0].intersection(end);
		if (!b) return;
		const c = lines[1].intersection(end);
		if (!c) return;
		const d = lines[1].intersection(start);
		if (!d) return;
		ctx.fillStyle = this.colorToHex(this.secondaryColor);
		ctx.beginPath();
		ctx.moveTo(a.x - 1/scale, a.y - 1/scale);
		ctx.lineTo(b.x, b.y);
		ctx.lineTo(c.x, c.y);
		ctx.lineTo(d.x - 1/scale, d.y - 1/scale);
		ctx.closePath();
		ctx.fill();
		ctx.resetTransform();
	}
}

export default class River extends PiecewiseTerrain implements RenderableLayerN1, RenderableMapLayerN1 {
	id = "river";

	constructor(minTerrain: MinTerrain & { lines: (MinTerrain & { line: MinLine, range: number, boundary: MinVec2[] })[] }) {
		super(minTerrain);
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		this.lines.forEach(line => line.render(you, canvas, ctx, scale));
	}

	renderMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		this.lines.forEach(line => line.renderMap(canvas, ctx, scale));
	}

	renderLayerN1(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		(<RiverSegment[]> this.lines).forEach(line => line.renderLayerN1(you, canvas, ctx, scale));
	}

	renderMapLayerN1(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		(<RiverSegment[]> this.lines).forEach(line => line.renderMapLayerN1(canvas, ctx, scale));
	}
}