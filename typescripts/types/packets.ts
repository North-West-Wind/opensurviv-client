import { Entity, Player } from "./entities";
import { MovementDirection } from "./maths";

interface IPacket {
	type: string;
}

export class PingPacket implements IPacket {
	type = "ping";
}

interface MovementPacket extends IPacket {
	type: string;
	direction: MovementDirection;
}

export class MovementPressPacket implements MovementPacket {
	type = "movementpress";
	direction: MovementDirection;

	constructor(direction: MovementDirection) {
		this.direction = direction;
	}
}

export class MovementReleasePacket implements MovementPacket {
	type = "movementrelease";
	direction: MovementDirection;

	constructor(direction: MovementDirection) {
		this.direction = direction;
	}
}

interface MousePacket extends IPacket {
	type: string;
	button: number;
}

export class MousePressPacket implements MousePacket {
	type = "mousepress";
	button: number;

	constructor(button: number) {
		this.button = button;
	}
}

export class MouseReleasePacket implements MousePacket {
	type = "mouserelease";
	button: number;

	constructor(button: number) {
		this.button = button;
	}
}

export class MouseMovePacket implements IPacket {
	type = "mousemove";
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export class GamePacket implements IPacket {
	type = "game";
	entities!: Entity[];
	player!: Player;
}