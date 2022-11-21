import { Vec2 } from "./maths";

export class DefinedAnimation {
	id: string;
	positions: Vec2[];
	rotations: Vec2[];
	keyframes: number[];
	duration: number;

	constructor(id: string, positions: Vec2[], rotations: Vec2[], keyframes: number[], duration: number) {
		this.id = id;
		this.positions = positions;
		this.rotations = rotations;
		this.keyframes = keyframes;
		this.duration = duration;
	}
}