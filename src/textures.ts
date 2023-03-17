import { OPENSURVIV_DATA } from "./constants";

const weapons = new Map<string, HTMLImageElement & { loaded: boolean }>();
(async() => {
	for (const id of await fetch(`${OPENSURVIV_DATA}/data/weapons/guns/.list.json`).then(res => res.json())) {
		const img: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
		img.onload = () => img.loaded = true;
		img.src = `assets/images/game/loots/weapons/${id}.png`;
	
		weapons.set(id, img);
	}
})();

export function getWeaponImage(id: string) {
	return weapons.get(id);
}