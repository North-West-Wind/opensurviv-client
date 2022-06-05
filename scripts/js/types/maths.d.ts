export declare class Vec2 {
    static readonly ZERO: Vec2;
    static readonly ONE: Vec2;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    magnitudeSqr(): number;
    magnitude(): number;
    inverse(): Vec2;
    unit(): Vec2;
    dot(vec: Vec2): number;
    angleBetween(vec: Vec2): number;
    angle(): number;
    addAngle(radian: number): Vec2;
    addVec(vec: Vec2): Vec2;
    addX(x: number): Vec2;
    addY(y: number): Vec2;
    scale(x: number, y: number): Vec2;
    scaleAll(ratio: number): Vec2;
}
export interface Hitbox {
    type: "rect" | "circle";
}
export declare class RectHitbox implements Hitbox {
    static readonly ZERO: RectHitbox;
    type: "rect";
    width: number;
    height: number;
    constructor(width: number, height: number);
}
export declare class CircleHitbox implements Hitbox {
    static readonly ZERO: RectHitbox;
    type: "circle";
    radius: number;
    constructor(radius: number);
}
export declare enum MovementDirection {
    RIGHT = 0,
    UP = 1,
    LEFT = 2,
    DOWN = 3
}
