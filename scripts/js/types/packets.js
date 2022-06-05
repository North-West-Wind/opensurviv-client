"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePacket = exports.MouseMovePacket = exports.MouseReleasePacket = exports.MousePressPacket = exports.MovementReleasePacket = exports.MovementPressPacket = exports.PingPacket = void 0;
class PingPacket {
    constructor() {
        this.type = "ping";
    }
}
exports.PingPacket = PingPacket;
class MovementPressPacket {
    constructor(direction) {
        this.type = "movementpress";
        this.direction = direction;
    }
}
exports.MovementPressPacket = MovementPressPacket;
class MovementReleasePacket {
    constructor(direction) {
        this.type = "movementrelease";
        this.direction = direction;
    }
}
exports.MovementReleasePacket = MovementReleasePacket;
class MousePressPacket {
    constructor(button) {
        this.type = "mousepress";
        this.button = button;
    }
}
exports.MousePressPacket = MousePressPacket;
class MouseReleasePacket {
    constructor(button) {
        this.type = "mouserelease";
        this.button = button;
    }
}
exports.MouseReleasePacket = MouseReleasePacket;
class MouseMovePacket {
    constructor(x, y) {
        this.type = "mousemove";
        this.x = x;
        this.y = y;
    }
}
exports.MouseMovePacket = MouseMovePacket;
class GamePacket {
    constructor() {
        this.type = "game";
    }
}
exports.GamePacket = GamePacket;
