import { Entity } from "../../types/entity";
import { MinEntity } from "../../types/minimized";

interface AdditionalEntity {
	dmg: number;
}

export default class Bullet extends Entity {
	type = "bullet";
	// Used for rendering bullet size
	dmg: number;

	constructor(minEntity: MinEntity & AdditionalEntity) {
		super(minEntity);
		this.dmg = minEntity.dmg;
	}
}