import { WEAPON_SUPPLIERS } from "./store/weapons";

const weapons = new Map<string, HTMLImageElement & { loaded: boolean }>();
for (const id of WEAPON_SUPPLIERS.keys()) {
	const img: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
	img.onload = () => img.loaded = true;
	img.src = `assets/images/game/loots/weapons/${id}.png`;

	weapons.set(id, img);
}

export function getWeaponImage(id: string) {
	return weapons.get(id);
}