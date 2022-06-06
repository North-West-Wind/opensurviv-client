/** @class An entity with position, velocity and hitbox */
class Entity {
	type = "";
	/** @type {Vec2} */
	position;
	direction = Vec2.ONE;
	/** @type {RectHitbox | CircleHitbox} */
	hitbox;
}

class Player extends Entity {
	/** @constant */
	type = "player";
	/** @type {string} */
	id;
	health = 100;
	maxHealth = 100;
	boost = 1;
	scope = 1;
}

class Bullet extends Entity {
	/** @constant */
	type = "bullet";
	/** @type {number} */
	damage;
	/** @type {number} */
	ticks;
}