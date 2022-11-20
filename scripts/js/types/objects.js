/** @class Objects inside the game */
class GameObject {
	type = "";
	/** @type {Vec2} */
	position;
	/** @type {RectHitbox | CircleHitbox} */
	hitbox;
}

/** @class Trees */
class Tree extends GameObject {
	type = "tree";
}
/** @class Barrel */
class Bush extends GameObject{
	type = "bush";
}
