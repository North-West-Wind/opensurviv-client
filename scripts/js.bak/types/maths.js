// Calculus paid off!
class Vec2 {
	static ZERO = new Vec2(0, 0);
	static ONE = new Vec2(1, 0);

	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}

	inverse() {
		return new Vec2(-this.x, -this.y);
	}

	unit() {
		const mag = this.magnitude();
		return new Vec2(this.x / mag, this.y / mag);
	}

	dot(vec: Vec2) {
		return this.x * vec.x + this.y * vec.y;
	}

	angleBetween(vec: Vec2) {
		return Math.acos(this.dot(vec) / (this.magnitude() * vec.magnitude()));
	}

	angle() {
		// Magnitude of unit vector is 1
		return Math.acos((this.x) / (this.magnitude()));
	}

	addAngle(radian: number) {
		const angle = this.angle() + radian;
		const mag = this.magnitude();
		return new Vec2(mag * Math.cos(angle), mag * Math.sin(angle));
	}

	addVec(vec: Vec2) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}

	addX(x: number) {
		return new Vec2(this.x + x, this.y);
	}

	addY(y: number) {
		return new Vec2(this.x, this.y + y);
	}

	scale(x: number, y: number) {
		return new Vec2(this.x * x, this.y * y);
	}

	scaleAll(ratio: number) {
		return this.scale(ratio, ratio);
	}
}

class Hitbox {
	type: "rect" | "circle";
}

// Rectangle hitbox with a width and height
class RectHitbox extends Hitbox {
	static readonly ZERO = new RectHitbox(0, 0);

	type: "rect" = "rect";
	width: number;
	height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
}

// Circle hitbox with a radius
class CircleHitbox extends Hitbox {
	static readonly ZERO = new RectHitbox(0, 0);

	type: "circle" = "circle";
	radius: number;

	constructor(radius: number) {
		this.radius = radius;
	}
}

// The 4 movement directions
const MovementDirection = {
	RIGHT: 0,
	UP: 1,
	LEFT: 2,
	DOWN: 3
}