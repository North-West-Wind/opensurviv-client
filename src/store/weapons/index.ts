import { MinWeapon } from "../../types/minimized";
import { DummyWeapon } from "../../types/weapon";
import Fists from "./fists";

export { default as Fists } from "./fists";

export function castCorrectWeapon(minWeapon: MinWeapon & any) {
	switch (minWeapon.id) {
		case "fists":
			return new Fists();
		default:
			return new DummyWeapon(minWeapon);
	}
}