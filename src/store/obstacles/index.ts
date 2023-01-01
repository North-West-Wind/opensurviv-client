import { CircleHitbox, Vec2 } from "../../types/math";
import { MinObstacle, MinMinObstacle } from "../../types/minimized";
import { Obstacle } from "../../types/obstacle";
import Bush from "./bush";
import Crate from "./crate";
import Tree from "./tree";

export { default as Tree } from "./tree";
export { default as Bush } from "./bush";
export { default as Crate } from "./crate";

// This still need hard-coding unfortunately
export function castCorrectObstacle(minObstacle: MinObstacle & any) {
	switch (minObstacle.type) {
		case "tree":
			return new Tree(minObstacle);
		case "bush":
			return new Bush(minObstacle);
		case "crate":
			return new Crate(minObstacle);
		default:
			return new Obstacle(minObstacle);
	}
}

export function castMinObstacle(minMinObstacle: MinMinObstacle & any) {
	const copy = minMinObstacle;
	return Object.assign(copy, { direction: Vec2.ONE, hitbox: new CircleHitbox(0), despawn: false });
}