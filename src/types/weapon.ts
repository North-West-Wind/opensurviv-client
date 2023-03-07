import { Player } from "../store/entities";
import { MinWeapon } from "./minimized";
import { Renderable } from "./extenstions";

export abstract class Weapon implements MinWeapon, Renderable {
	id!: string;
	name!: string;

	abstract render(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;
}

// Melee weapons should directly extend Weapon class
//export abstract class MeleeWeapon extends Weapon { }

export abstract class GunWeapon extends Weapon {
	// For animation
	recoil: "small" | "medium" | "large" = "small";
	magazine = 0;
	dual = -1;
}

// Dummy weapon
export class DummyWeapon extends Weapon {
	render(_player: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}