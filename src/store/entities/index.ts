import { Entity } from "../../types/entities";
import { MinEntity } from "../../types/minimized";
import Bullet from "./bullet";
import Player from "./player";

export { default as Player } from "./player";
export { default as Bullet } from "./bullet";

// This still need hard-coding unfortunately
export function castCorrectEntity(minEntity: MinEntity & any) {
	switch (minEntity.type) {
		case "player":
			return new Player(minEntity);
		case "bullet":
			return new Bullet(minEntity);
		default:
			return new Entity(minEntity);
	}
}