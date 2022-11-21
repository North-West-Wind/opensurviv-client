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

	render(player: Player, relative: Vec2, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) { };
}