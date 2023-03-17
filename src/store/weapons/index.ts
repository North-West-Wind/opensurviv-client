import { MeleeData, GunData } from "../../types/data";
import { MinWeapon } from "../../types/minimized";
import { WeaponSupplier } from "../../types/supplier";
import { MeleeWeapon, GunWeapon } from "../../types/weapon";

export const WEAPON_SUPPLIERS = new Map<string, WeaponSupplier>();

export { default as FragGrenade } from "./grenades/frag_grenade";

export function castCorrectWeapon(minWeapon: MinWeapon & any) {
	return WEAPON_SUPPLIERS.get(minWeapon.id)?.create() || WEAPON_SUPPLIERS.get("fists")!.create();
}

const MELEE_LIST = [
	"fists"
];

const GUN_LIST = [
	"m9"
];

class MeleeSupplier implements WeaponSupplier {
	id: string;
	data: MeleeData;

	constructor(id: string, data: MeleeData) {
		this.id = id;
		this.data = data;
	}

	create() {
		return new MeleeWeapon(this.id, this.data);
	}
}

class GunSupplier implements WeaponSupplier {
	id: string;
	data: GunData;

	constructor(id: string, data: GunData) {
		this.id = id;
		this.data = data;
	}

	create() {
		return new GunWeapon(this.id, this.data);
	}
}

(async() => {
	for (const file of await fetch(`https://raw.githubusercontent.com/North-West-Wind/opensurviv-data/main/data/weapons/melee/.list.json`).then(res => res.json())) {
		const data = <MeleeData> await fetch(`https://raw.githubusercontent.com/North-West-Wind/opensurviv-data/main/data/weapons/melee/${file}.json`).then(res => res.json());
		WEAPON_SUPPLIERS.set(file, new MeleeSupplier(file, data));
	}
	
	for (const file of await fetch(`https://raw.githubusercontent.com/North-West-Wind/opensurviv-data/main/data/weapons/guns/.list.json`).then(res => res.json())) {
		if (file.startsWith(".")) continue;
		const data = <GunData> await fetch(`https://raw.githubusercontent.com/North-West-Wind/opensurviv-data/main/data/weapons/guns/${file}.json`).then(res => res.json())
		WEAPON_SUPPLIERS.set(file, new GunSupplier(file, data));
	}
})();