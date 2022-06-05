"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementDirection = exports.CircleHitbox = exports.RectHitbox = exports.Vec2 = void 0;
// Calculus paid off!
class Vec2 {
    constructor(x, y) {
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
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    angleBetween(vec) {
        return Math.acos(this.dot(vec) / (this.magnitude() * vec.magnitude()));
    }
    angle() {
        // Magnitude of unit vector is 1
        return Math.acos((this.x) / (this.magnitude()));
    }
    addAngle(radian) {
        const angle = this.angle() + radian;
        const mag = this.magnitude();
        return new Vec2(mag * Math.cos(angle), mag * Math.sin(angle));
    }
    addVec(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }
    addX(x) {
        return new Vec2(this.x + x, this.y);
    }
    addY(y) {
        return new Vec2(this.x, this.y + y);
    }
    scale(x, y) {
        return new Vec2(this.x * x, this.y * y);
    }
    scaleAll(ratio) {
        return this.scale(ratio, ratio);
    }
}
exports.Vec2 = Vec2;
Vec2.ZERO = new Vec2(0, 0);
Vec2.ONE = new Vec2(1, 0);
// Rectangle hitbox with a width and height
class RectHitbox {
    constructor(width, height) {
        this.type = "rect";
        this.width = width;
        this.height = height;
    }
}
exports.RectHitbox = RectHitbox;
RectHitbox.ZERO = new RectHitbox(0, 0);
// Circle hitbox with a radius
class CircleHitbox {
    constructor(radius) {
        this.type = "circle";
        this.radius = radius;
    }
}
exports.CircleHitbox = CircleHitbox;
CircleHitbox.ZERO = new RectHitbox(0, 0);
// The 4 movement directions
var MovementDirection;
(function (MovementDirection) {
    MovementDirection[MovementDirection["RIGHT"] = 0] = "RIGHT";
    MovementDirection[MovementDirection["UP"] = 1] = "UP";
    MovementDirection[MovementDirection["LEFT"] = 2] = "LEFT";
    MovementDirection[MovementDirection["DOWN"] = 3] = "DOWN";
})(MovementDirection = exports.MovementDirection || (exports.MovementDirection = {}));
