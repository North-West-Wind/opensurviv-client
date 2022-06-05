"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = exports.Player = exports.Entity = void 0;
const maths_1 = require("./maths");
class Entity {
    constructor() {
        this.type = "";
        this.velocity = maths_1.Vec2.ZERO;
        this.direction = maths_1.Vec2.ONE;
        this.hitbox = maths_1.CircleHitbox.ZERO;
    }
}
exports.Entity = Entity;
class Player extends Entity {
    constructor() {
        super(...arguments);
        this.type = "player";
        this.health = 100;
        this.boost = 1;
        this.scope = 1;
    }
}
exports.Player = Player;
class Bullet extends Entity {
    constructor() {
        super(...arguments);
        this.type = "bullet";
    }
}
exports.Bullet = Bullet;
