import { Player } from "../store/entities";
import { Plain } from "../store/terrains";
import { Entity } from "./entity";
import { Vec2 } from "./math";
import { MinTerrain, MinVec2 } from "./minimized";
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
		if (!defaultTerrain) defaultTerrain = new Plain({ id: "plain" });
		this.defaultTerrain = defaultTerrain;
	}
}

export abstract class Terrain implements Renderable, RenderableMap {
	id: string;
	type = "generic";
	// Use ARGB
	color = 0;

	constructor(minTerrain: MinTerrain) {
		this.id = minTerrain.id;
	}

	colorToHex() {
		return "#" + (this.color & 0xFFFFFF).toString(16);
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