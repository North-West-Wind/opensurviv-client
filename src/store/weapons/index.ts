import { MinWeapon } from "../../types/minimized";
import { WeaponSupplier } from "../../types/supplier";

export const WEAPON_SUPPLIERS = new Map<string, WeaponSupplier>();

import Fists from "./fists";

export { default as Fists } from "./fists";
export { default as M9 } from "./guns/m9";
export { default as M870} from "./guns/m870";
export { default as Mosin_Nagant} from "./guns/mosin_nagant";
export { default as MP5} from "./guns/mp5";
export { default as M1100} from "./guns/m1100";
export { default as MP220} from "./guns/mp220";
export { default as FragGrenade} from "./grenades/frag_grenade"

export function castCorrectWeapon(minWeapon: MinWeapon & any) {
	if (WEAPON_SUPPLIERS.has(minWeapon.id)) return WEAPON_SUPPLIERS.get(minWeapon.id)!.create(minWeapon);
	else return new Fists();
}