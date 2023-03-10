import { WEAPON_SUPPLIERS } from "..";
import { Vec2 } from "../../../types/math";
import { MinWeapon } from "../../../types/minimized";
import { WeaponSupplier } from "../../../types/supplier";
import { GrenadeWeapon, GunWeapon } from "../../../types/weapon";
import { circleFromCenter, roundRect } from "../../../utils";
import { Player } from "../../entities";

class FragGrenadeSupplier implements WeaponSupplier {
	create(minWeapon: any) {
		return new FragGrenade(minWeapon);
	}
}

export default class FragGrenade extends GrenadeWeapon {
	static readonly ID = "fragGrenade";
	id = FragGrenade.ID;
	name = "Frag Grenade";

	constructor(weapon: MinWeapon | GunWeapon) {
		super();
		// This is a full weapon
		if ((<any>weapon)["recoil"]) {
			const fullWeapon = <GunWeapon>weapon;
		}
	}

	static {
		WEAPON_SUPPLIERS.set(FragGrenade.ID, new FragGrenadeSupplier());
	}

	render(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const radius = scale * player.hitbox.comparable;
		const fistRadius = radius / 3;
		const fistPositions = [new Vec2(player.hitbox.comparable, 0.1), new Vec2(player.hitbox.comparable + 0.25, -0.1)];
		var offset = Vec2.ZERO;
		ctx.fillStyle = "#222";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 0.025 * scale;
		//ctx.fillRect(player.hitbox.comparable * scale, -0.15 * scale, 1.2 * scale, 0.3 * scale);
		roundRect(ctx, player.hitbox.comparable * scale, -0.15 * scale, 0.5 * scale, 0.3 * scale, 0.15 * scale, true, true);
		ctx.fillStyle = "#F8C675";
		ctx.lineWidth = fistRadius / 3;
		ctx.strokeStyle = "#000000";
		for (const pos of fistPositions) {
			const fist = pos.addVec(offset).scaleAll(scale);
			circleFromCenter(ctx, fist.x, fist.y, fistRadius, true, true);
		}
	}
}