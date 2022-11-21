import { Vec2, Hitbox, RectHitbox, CircleHitbox } from "./types/maths";

export enum CommonAngle {
	PI_FOUR = Math.PI / 4,
	PI_TWO = Math.PI / 2
}

export enum CommonNumber {
	SIN45 = Math.sin(CommonAngle.PI_FOUR)
}

export const ENTITY_ASSIGNS = {
	position: (pos: Vec2) => new Vec2(pos.x, pos.y),
	direction: (dir: Vec2) => new Vec2(dir.x, dir.y),
	hitbox: (box: any) => {
		if (box.type === "rect") return new RectHitbox(box.width, box.height);
		else return new CircleHitbox(box.radius);
	}
}

export const OBJECT_ASSIGNS = {
	position: (pos: Vec2) => new Vec2(pos.x, pos.y),
	hitbox: (box: any) => {
		if (box.type === "rect") return new RectHitbox(box.width, box.height);
		else return new CircleHitbox(box.radius);
	}
}