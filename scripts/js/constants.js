/** @enum {number} */
const COMMON_ANGLES = {
	PI_FOUR: Math.PI / 4,
	PI_TWO: Math.PI / 2
}
const ENTITY_ASSIGNS = {
	position: (pos) => new Vec2(pos.x, pos.y),
	direction: (dir) => new Vec2(dir.x, dir.y),
	hitbox: (box) => {
		if (box.type === "rect") return new RectHitbox(box.width, box.height);
		else return new CircleHitbox(box.radius);
	}
}
const OBJECT_ASSIGNS = {
	position: (pos) => new Vec2(pos.x, pos.y),
	hitbox: (box) => {
		if (box.type === "rect") return new RectHitbox(box.width, box.height);
		else return new CircleHitbox(box.radius);
	}
}