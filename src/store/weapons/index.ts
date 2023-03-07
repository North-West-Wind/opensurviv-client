import { MinWeapon } from "../../types/minimized";
import { WeaponSupplier } from "../../types/supplier";

export const WEAPON_SUPPLIERS = new Map<string, WeaponSupplier>();

import Fists from "./fists";

export { default as Fists } from "./fists";
export { default as M9 } from "./guns/m9";

export function castCorrectWeapon(minWeapon: MinWeapon & any) {
	if (WEAPON_SUPPLIERS.has(minWeapon.id)) return WEAPON_SUPPLIERS.get(minWeapon.id)!.create(minWeapon);
	else return new Fists();
}