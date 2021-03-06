/** @class Packet to ping the server */
class PingPacket {
	/** @constant */
	type = "ping";
}

/** @class Packet to notify movement key press */
class MovementPressPacket {
	/** @constant */
	type = "movementpress";

	/**
	 * @constructor
	 * @param {MovementDirection} direction 
	 */
	constructor(direction) {
		this.direction = direction;
	}
}

/** @class Packet to notify movement key release */
class MovementReleasePacket {
	/** @constant */
	type = "movementrelease";

	/**
	 * @constructor
	 * @param {MovementDirection} direction 
	 */
	constructor(direction) {
		this.direction = direction;
	}
}

/** @class Packet to notify mouse button press */
class MousePressPacket {
	/** @constant */
	type = "mousepress";
	
	/**
	 * @constructor
	 * @param {number} button 
	 */
	constructor(button) {
		this.button = button;
	}
}

/** @class Packet to notify mouse button release */
class MouseReleasePacket {
	/** @constant */
	type = "mouserelease";

	/**
	 * @constructor
	 * @param {number} button 
	 */
	constructor(button) {
		this.button = button;
	}
}

/** @class Packet to notify mouse movement */
class MouseMovePacket {
	/** @constant */
	type = "mousemove";

	/**
	 * @constructor
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

/** @class Packet from server containing game data */
class GamePacket {
	/** @constant */
	type = "game";
	/** @type {Entity[]} */
	entities;
	/** @type {GameObject[]} */
	objects;
	/** @type {Player} */
	player;
}