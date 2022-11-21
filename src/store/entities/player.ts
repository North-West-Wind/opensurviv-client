import { Entity } from "../../types/entities";
import { MinEntity } from "../../types/minimized";

interface AdditionalEntity {
	id: string;
	boost: number;
	scope: number;
}

export default class Player extends Entity {
	type = "player";
	id: string;
	boost: number;
	scope: number;

	constructor(minEntity: MinEntity & AdditionalEntity) {
		super(minEntity);
		this.id = minEntity.id;
		this.boost = minEntity.boost;
		this.scope = minEntity.scope;
	}
}