/** @class Calculus paid off! (2D vector) */
class Vec2 {
	/** @constant */
	static ZERO = new Vec2(0, 0);
	/** @constant */
	static ONE = new Vec2(1, 0);

	/**
	 * @constructor
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Magnitude squared
	 * @returns {number}
	 */
	magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	/**
	 * Magnitude squared rooted
	 * @returns {number}
	 */
	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}

	/** @returns {Vec2} */
	inverse() {
		return new Vec2(-this.x, -this.y);
	}

	/**
	 * Converts into unit vector
	 * @returns {Vec2}
	 */
	unit() {
		const mag = this.magnitude();
		return new Vec2(this.x / mag, this.y / mag);
	}

	/**
	 * Dot product of 2 vectors
	 * @param {Vec2} vec 
	 * @returns {number}
	 */
	dot(vec) {
		return this.x * vec.x + this.y * vec.y;
	}

	/**
	 * Angle between 2 vectors, in radian
	 * @param {Vec2} vec 
	 * @returns {number}
	 */
	angleBetween(vec) {
		return Math.acos(this.dot(vec) / (this.magnitude() * vec.magnitude()));
	}

	/**
	 * Angle of vector from rightward unit vector
	 * @returns {number}
	 */
	angle() {
		// Magnitude of unit vector is 1
		const angle = Math.acos((this.x) / (this.magnitude()));
		if (this.y > 0) return angle;
		else return -angle;
	}

	/**
	 * Adds angle to a vector
	 * @param {number} radian 
	 * @returns {Vec2}
	 */
	addAngle(radian) {
		const angle = this.angle() + radian;
		const mag = this.magnitude();
		return new Vec2(mag * Math.cos(angle), mag * Math.sin(angle));
	}

	/**
	 * Sum of 2 vectors
	 * @param {Vec2} vec 
	 * @returns {Vec2}
	 */
	addVec(vec) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}

	/**
	 * Offsets the x magnitude
	 * @param {number} x 
	 * @returns {Vec2}
	 */
	addX(x) {
		return new Vec2(this.x + x, this.y);
	}

	/**
	 * Offsets the y magnitude
	 * @param {number} y
	 * @returns {Vec2}
	 */
	addY(y) {
		return new Vec2(this.x, this.y + y);
	}

	/**
	 * Scales x and y independently
	 * @param {number} x 
	 * @param {number} y 
	 * @returns {Vec2}
	 */
	scale(x, y) {
		return new Vec2(this.x * x, this.y * y);
	}

	/**
	 * Scales x and y with the same ratio
	 * @param {number} ratio 
	 * @returns {Vec2}
	 */
	scaleAll(ratio) {
		return this.scale(ratio, ratio);
	}
}

/** Rectangle hitbox with a width and height */
class RectHitbox {
	/** @constant */
	static ZERO = new RectHitbox(0, 0);

	/** @constant */
	type = "rect";

	/**
	 * @constructor
	 * @param {number} width 
	 * @param {number} height 
	 */
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
}

/** Circular hitbox with a radius */
class CircleHitbox {
	/** @constant */
	static ZERO = new CircleHitbox(0, 0);

	/** @constant */
	type = "circle";

	/**
	 * @constructor
	 * @param {number} radius 
	 */
	constructor(radius) {
		this.radius = radius;
	}
}

/**
 * The 4 movement directions
 * @enum {number}
 */
const MovementDirection = {
	RIGHT: 0,
	UP: 1,
	LEFT: 2,
	DOWN: 3
}