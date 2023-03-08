import { Entity } from "../../types/entity";
import { MinEntity } from "../../types/minimized";
import Player from "./player";

interface AdditionalEntity {
	dmg: number;
}

export default class Grenade extends Entity {
	type = "grenade";
	// Used for rendering Grenade size
	dmg!: number;

	constructor(minEntity: MinEntity & AdditionalEntity) {
		super(minEntity);
		this.copy(minEntity);
	}

	copy(minEntity: MinEntity & AdditionalEntity) {
		super.copy(minEntity);
		this.dmg = minEntity.dmg;
	}

	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}