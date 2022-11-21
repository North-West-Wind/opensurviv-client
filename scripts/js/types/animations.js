/** @class Defines animation path */
class Animation {
	/** @type {Vec2[]} Position at different keyframes. */
	positions;
	/** @type {Vec2[]} Rotation at different keyframes. */
	rotations;
	/** @type {number[]} Keyframe percentage that corresponds to positions. Similar to CSS keyframes. */
	keyframes;
	/** @type {number} Duration of the animation in server-side ticks. */
	duration;

	/**
	 * @constructor
	 * @param {Vec2[]} positions 
	 * @param {Vec2[]} rotations 
	 * @param {number[]} keyframes 
	 * @param {number} duration 
	 */
	constructor(positions, rotations, keyframes, duration) {
		this.positions = positions;
		this.rotations = rotations;
		this.keyframes = keyframes;
		this.duration = duration;
	}
}

/** @constant {Map<string, Animation>} */
const ANIMATIONS = new Map();

ANIMATIONS.set("left_fist", new Animation(
	[new Vec2(0, -1), Vec2.ONE, new Vec2(0, -1)],
	[null, null, null],
	[0, 0.5, 1],
	50
));

ANIMATIONS.set("right_fist", new Animation(
	[new Vec2(0, 1), Vec2.ONE, new Vec2(0, 1)],
	[null, null, null],
	[0, 0.5, 1],
	50
));