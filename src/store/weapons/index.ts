import { MinWeapon } from "../../types/minimized";
import { Weapon } from "../../types/weapons";
import Fists from "./fists";

export { default as Fists } from "./fists";

export function castCorrectWeapon(minWeapon: MinWeapon & any) {
	switch (minWeapon.id) {
		case "fists":
			return new Fists();
		default:
			return new Weapon(minWeapon);
	}
}