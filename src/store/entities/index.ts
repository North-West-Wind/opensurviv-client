import { DummyEntity } from "../../types/entity";
import { MinEntity } from "../../types/minimized";
import Ammo from "./ammo";
import Bullet from "./bullet";
import Gun from "./gun";
import Player from "./player";

export { Ammo, Bullet, Gun, Player };

// This still need hard-coding unfortunately
export function castCorrectEntity(minEntity: MinEntity & any) {
	switch (minEntity.type) {
		case "player":
			return new Player(minEntity);
		case "bullet":
			return new Bullet(minEntity);
		case "gun":
			return new Gun(minEntity);
		case "ammo":
			return new Ammo(minEntity);
		default:
			return new DummyEntity(minEntity);
	}
}