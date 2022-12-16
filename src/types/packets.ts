import { Player } from "../store/entities";
import { MovementDirection } from "./maths";
import { MinEntity, MinGameObject, MinMinGameObject } from "./minimized";

// Packet to ping the server
export class PingPacket {
	type = "ping";
}

// Packet to notify movement key press
export class MovementPressPacket {
	type = "movementpress";
	direction: MovementDirection;

	constructor(direction: MovementDirection) {
		this.direction = direction;
	}
}

// Packet to notify movement key release
export class MovementReleasePacket {
	type = "movementrelease";
	direction: MovementDirection;

	constructor(direction: MovementDirection) {
		this.direction = direction;
	}
}

// Packet to notify mouse button press
export class MousePressPacket {
	type = "mousepress";
	button: number;

	constructor(button: number) {
		this.button = button;
	}
}

// Packet to notify mouse button release
export class MouseReleasePacket {
	type = "mouserelease";
	button: number;

	constructor(button: number) {
		this.button = button;
	}
}

// Packet to notify mouse movement
export class MouseMovePacket {
	type = "mousemove";
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

// Packet from server containing game data
export class GamePacket {
	type = "game";
	entities!: MinEntity[];
	objects!: MinGameObject[];
	player!: Player;
}

// Packet from server containing map data
export class MapPacket {
	type = "map";
	objects!: MinMinGameObject[];
}