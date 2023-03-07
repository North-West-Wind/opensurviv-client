import { WEAPON_SUPPLIERS } from ".";
import { CommonNumber, CommonAngle } from "../../constants";
import { CircleHitbox, Vec2 } from "../../types/math";
import { WeaponSupplier } from "../../types/supplier";
import { Weapon } from "../../types/weapon";
import { circleFromCenter } from "../../utils";
import { DEFINED_ANIMATIONS } from "../animations";
import { Player } from "../entities";

const fistAnimations = ["left_fist", "right_fist"];

class FistsSupplier implements WeaponSupplier {
	create() {
		return new Fists();
	}
}

export default class Fists extends Weapon {
	static readonly ID = "fists";
	id = Fists.ID;
	name = "Fists";

	static {
		WEAPON_SUPPLIERS.set(Fists.ID, new FistsSupplier());
	}

	render(player: Player, _canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const radius = scale * (<CircleHitbox> player.hitbox).radius;
		const fistScale = radius * 1.2 * CommonNumber.SIN45;
		const fistExtend = Vec2.ONE.scaleAll(fistScale);
		const fists = [];
		if (!fistAnimations.some(a => player.animations.find(aa => aa.id == a))) {
			fists.push(fistExtend.addVec(fistExtend.addAngle(CommonAngle.PI_TWO)));
			fists.push(fistExtend.addVec(fistExtend.addAngle(-CommonAngle.PI_TWO)));
		} else {
			for (const animation of player.animations) {
				const anim = DEFINED_ANIMATIONS.get(animation.id);
				if (anim) {
					const index = fistAnimations.indexOf(animation.id);
					const portion = (anim.duration - animation.duration) / anim.duration;
					for (let ii = 0; ii < anim.keyframes.length - 1; ii++) {
						if (portion >= anim.keyframes[ii] && portion <= anim.keyframes[ii + 1]) {
							const position = anim.positions[ii].addVec(anim.positions[ii + 1].addVec(anim.positions[ii].inverse()).scaleAll((portion - anim.keyframes[ii]) / (anim.keyframes[ii + 1] - anim.keyframes[ii]))).scaleAll(fistScale);
							// TODO: handle rotation
							//const rotation = anim.rotations[ii]
							fists.push(fistExtend.addVec(position));
							break;
						}
					}
					fists.push(fistExtend.addVec(fistExtend.addAngle(CommonAngle.PI_TWO * (-index * 2 + 1))));
				}
			}
		}
	
		const fistRadius = radius / 3;
		ctx.fillStyle = "#F8C675";
		ctx.lineWidth = fistRadius / 3;
		ctx.strokeStyle = "#000000";
		for (const fist of fists) circleFromCenter(ctx, fist.x, fist.y, fistRadius, true, true);
	}
}