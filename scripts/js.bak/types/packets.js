class IPacket {
	type: string;
}

class PingPacket extends IPacket {
	type = "ping";
}

class MovementPacket extends IPacket {
	type: string;
	direction: MovementDirection;
}

class MovementPressPacket extends MovementPacket {
	type = "movementpress";
	direction: MovementDirection;

	constructor(direction: MovementDirection) {
		this.direction = direction;
	}
}

class MovementReleasePacket extends MovementPacket {
	type = "movementrelease";
	direction: MovementDirection;

	constructor(direction: MovementDirection) {
		this.direction = direction;
	}
}

class MousePacket extends IPacket {
	type: string;
	button: number;
}

class MousePressPacket extends MousePacket {
	type = "mousepress";
	button: number;

	constructor(button: number) {
		this.button = button;
	}
}

class MouseReleasePacket extends MousePacket {
	type = "mouserelease";
	button: number;

	constructor(button: number) {
		this.button = button;
	}
}

class MouseMovePacket extends IPacket {
	type = "mousemove";
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

class GamePacket extends IPacket {
	type = "game";
	entities: Entity[];
	player: Player;
}