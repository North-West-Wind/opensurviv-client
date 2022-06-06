/** @enum {number} */
const COMMON_ANGLES = {
	PI_FOUR: Math.PI / 4,
	PI_TWO: Math.PI / 2
}
const ENTITY_ASSIGNS = {
	position: (pos) => new Vec2(pos.x, pos.y),
	direction: (dir) => new Vec2(dir.x, dir.y)
}