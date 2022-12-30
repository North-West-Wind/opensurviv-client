import { DefinedAnimation } from "../../types/animation";
import { Vec2 } from "../../types/math";

const LEFT_FIST = new DefinedAnimation(
	"left_fist",
	[new Vec2(0, -1), Vec2.ONE, new Vec2(0, -1)],
	Array(3).fill(Vec2.ZERO),
	[0, 0.5, 1],
	50
);

const RIGHT_FIST = new DefinedAnimation(
	"right_fist",
	[new Vec2(0, 1), Vec2.ONE, new Vec2(0, 1)],
	Array(3).fill(Vec2.ZERO),
	[0, 0.5, 1],
	50
);

export default function addToMap(map: Map<string, DefinedAnimation>) {
	map.set(LEFT_FIST.id, LEFT_FIST);
	map.set(RIGHT_FIST.id, RIGHT_FIST);
}