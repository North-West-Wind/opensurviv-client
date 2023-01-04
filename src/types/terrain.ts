import { Player } from "../store/entities";
import { castCorrectTerrain, Plain } from "../store/terrains";
import { Entity } from "./entity";
import { Line, Vec2 } from "./math";
import { MinLine, MinTerrain, MinVec2 } from "./minimized";
import { Obstacle } from "./obstacle";
import { Renderable, RenderableMap } from "./render";

export class World {
	size: Vec2;
	entities: Entity[] = [];
	obstacles: Obstacle[] = [];
	defaultTerrain: Terrain;
	terrains: Terrain[] = [];

	constructor(size?: Vec2, defaultTerrain?: Terrain) {
		if (!size) size = Vec2.ZERO;
		this.size = size;
		if (!defaultTerrain) defaultTerrain = new Plain({ id: "plain", border: 0 });
		this.defaultTerrain = defaultTerrain;
	}
}

export abstract class Terrain implements Renderable, RenderableMap {
	id: string;
	border: number;
	type = "generic";
	// Use ARGB
	color = 0;

	constructor(minTerrain: MinTerrain) {
		this.id = minTerrain.id;
		this.border = minTerrain.border;
	}

	colorToHex(color?: number) {
		if (!color) color = this.color;
		return "#" + (color & 0xFFFFFF).toString(16);
	}

	abstract render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;
	abstract renderMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;
}

export abstract class DotTerrain extends Terrain {
	type = "dot";
	position: Vec2;
	radius: number;

	constructor(minTerrain: MinTerrain & { position: MinVec2, radius: number }) {
		super(minTerrain);
		this.position = new Vec2(minTerrain.position.x, minTerrain.position.y);
		this.radius = minTerrain.radius;
	}
}

export abstract class LineTerrain extends Terrain {
	type = "line";
	line: Line;
	range: number;
	boundary: { start: Vec2, end: Vec2 };

	constructor(minTerrain: MinTerrain & { line: MinLine, range: number, boundary: MinVec2[] }) {
		super(minTerrain);
		this.line = Line.fromMinLine(minTerrain.line);
		this.range = minTerrain.range;
		this.boundary = { start: Vec2.fromMinVec2(minTerrain.boundary[0]), end: Vec2.fromMinVec2(minTerrain.boundary[1]) };
	}
}

export abstract class PiecewiseTerrain extends Terrain {
	type = "piecewise";
	lines: LineTerrain[] = [];

	constructor(minTerrain: MinTerrain & { lines: (MinTerrain & { line: MinLine, range: number, boundary: MinVec2[] })[] }) {
		super(minTerrain);
		for (const line of minTerrain.lines)
			this.lines.push(<LineTerrain> castCorrectTerrain(line));
	}
}