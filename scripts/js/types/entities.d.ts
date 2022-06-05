import { Hitbox, Vec2 } from "./maths";
export declare class Entity {
    type: string;
    position: Vec2;
    velocity: Vec2;
    direction: Vec2;
    hitbox: Hitbox;
}
export declare class Player extends Entity {
    type: string;
    id: string;
    health: number;
    boost: number;
    scope: number;
}
export declare class Bullet extends Entity {
    type: string;
    damage: number;
    ticks: number;
}
