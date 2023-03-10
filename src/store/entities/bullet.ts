import { ENTITY_SUPPLIERS } from ".";
import { Entity } from "../../types/entity";
import { MinEntity } from "../../types/minimized";
import { EntitySupplier } from "../../types/supplier";
import Player from "./player";

interface AdditionalEntity {
	dmg: number;
}

class BulletSupplier implements EntitySupplier {
	create(minEntity: MinEntity & AdditionalEntity) {
		return new Bullet(minEntity);
	}
}

export default class Bullet extends Entity {
	static readonly TYPE = "bullet";
	type = Bullet.TYPE;
	// Used for rendering bullet size
	dmg!: number;

	constructor(minEntity: MinEntity & AdditionalEntity) {
		super(minEntity);
		this.copy(minEntity);
	}

	static {
		ENTITY_SUPPLIERS.set(Bullet.TYPE, new BulletSupplier());
	}

	copy(minEntity: MinEntity & AdditionalEntity) {
		super.copy(minEntity);
		this.dmg = minEntity.dmg;
	}

	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}