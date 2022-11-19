/** @interface Data about attacks */
class AttackAttribute {
	/** @type {string} */
	name;
	/** @type {number} */
	duration;
}

/** @interface Weapon data */
class Weapon {
	/** @type {string} */
	name;
}

/** @interface Inventory data */
class Inventory {
	/** @type {Weapon} */
	holding;
}

/** @class An entity with position, velocity and hitbox */
class Entity {
	type = "";
	/** @type {Vec2} */
	position;
	direction = Vec2.ONE;
	/** @type {RectHitbox | CircleHitbox} */
	hitbox;
	health = 100;
	maxHealth = 100;
	/** @type {AttackAttribute} */
	attack;
	/** @type {Inventory} */
	inventory;
}

class Player extends Entity {
	/** @constant */
	type = "player";
	/** @type {string} */
	id;
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