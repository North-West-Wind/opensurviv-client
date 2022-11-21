import { CircleHitbox, Hitbox, RectHitbox, Vec2 } from "./maths";
import { MinCircleHitbox, MinEntity, MinInventory, MinRectHitbox } from "./minimized";

// Data about animations
export interface Animation {
	name: string;
	duration: number;
}

// Weapon data
export interface Weapon {
	name: string;
}

// An entity with position, velocity and hitbox
export class Entity {
	type!: string;
	position!: Vec2;
	direction!: Vec2;
	hitbox!: Hitbox;
	animation!: Animation;
	health!: number;
	maxHealth!: number;

	constructor(minEntity: MinEntity) {
		this.type = minEntity.type;
		this.position = new Vec2(minEntity.position.x, minEntity.position.y);
		this.direction = new Vec2(minEntity.direction.x, minEntity.direction.y);
		if (minEntity.hitbox.type === "rect") {
			const rect = <MinRectHitbox> minEntity.hitbox;
			this.hitbox = new RectHitbox(rect.width, rect.height);
		} else {
			const circle = <MinCircleHitbox> minEntity.hitbox;
			this.hitbox = new CircleHitbox(circle.radius);
		}
		this.animation = minEntity.animation;
		this.health = this.maxHealth = 100;
	}
}