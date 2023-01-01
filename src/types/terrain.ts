import { Plain } from "../store/terrains";
import { Entity } from "./entity";
import { Vec2 } from "./math";
import { Obstacle } from "./obstacle";

export class World {
	size: Vec2;
	entities: Entity[] = [];
	obstacles: Obstacle[] = [];
	defaultTerrain: Terrain;

	constructor(size?: Vec2, defaultTerrain?: Terrain) {
		if (!size) size = Vec2.ZERO;
		this.size = size;
		if (!defaultTerrain) defaultTerrain = new Plain();
		this.defaultTerrain = defaultTerrain;
	}
}

export class Terrain {
	type = "generic";
	// Use ARGB
	color: number;

	constructor(color: number) {
		this.color = color;
	}
}

export class DotTerrain extends Terrain {
	type = "dot";
	position: Vec2;
	radius: number;

	constructor(color: number, position: Vec2, radius: number) {
		super(color);
		this.position = position;
		this.radius = radius;
	}
}