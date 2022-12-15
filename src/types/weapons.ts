import { Player } from "../store/entities";
import { Vec2 } from "./maths";
import { MinWeapon } from "./minimized";

export class Weapon implements MinWeapon {
	id: string;
	name: string;

	constructor(minWeapon: MinWeapon) {
		this.id = minWeapon.id;
		this.name = minWeapon.name;
	}

	render(_player: Player, _relative: Vec2, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}