import { Entity, Player } from "./entities";
import { MovementDirection } from "./maths";
interface IPacket {
    type: string;
}
export declare class PingPacket implements IPacket {
    type: string;
}
interface MovementPacket extends IPacket {
    type: string;
    direction: MovementDirection;
}
export declare class MovementPressPacket implements MovementPacket {
    type: string;
    direction: MovementDirection;
    constructor(direction: MovementDirection);
}
export declare class MovementReleasePacket implements MovementPacket {
    type: string;
    direction: MovementDirection;
    constructor(direction: MovementDirection);
}
interface MousePacket extends IPacket {
    type: string;
    button: number;
}
export declare class MousePressPacket implements MousePacket {
    type: string;
    button: number;
    constructor(button: number);
}
export declare class MouseReleasePacket implements MousePacket {
    type: string;
    button: number;
    constructor(button: number);
}
export declare class MouseMovePacket implements IPacket {
    type: string;
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class GamePacket implements IPacket {
    type: string;
    entities: Entity[];
    player: Player;
}
export {};
