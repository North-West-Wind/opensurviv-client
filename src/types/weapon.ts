import { Player } from "../store/entities";
import { MinWeapon } from "./minimized";
import { Renderable } from "./render";

export abstract class Weapon implements MinWeapon, Renderable {
	id: string;
	name: string;

	constructor(minWeapon: MinWeapon) {
		this.id = minWeapon.id;
		this.name = minWeapon.name;
	}

	abstract render(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;
}

// Dummy weapon
export class DummyWeapon extends Weapon {
	render(_player: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}