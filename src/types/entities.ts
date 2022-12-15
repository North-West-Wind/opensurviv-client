import { Player } from "../store/entities";
import { castCorrectWeapon } from "../store/weapons";
import { CircleHitbox, Hitbox, RectHitbox, Vec2 } from "./maths";
import { MinCircleHitbox, MinEntity, MinInventory, MinRectHitbox } from "./minimized";
import { Weapon } from "./weapons";

// Data about animations
export interface Animation {
	name: string;
	duration: number;
}

// Inventory, mainly for players
export class Inventory {
	holding: Weapon;

	constructor(minInv: MinInventory) {
		this.holding = castCorrectWeapon(minInv.holding);
	}
}

// An entity with position, velocity and hitbox
export class Entity {
	type: string;
	position: Vec2;
	direction: Vec2;
	hitbox: Hitbox;
	animation: Animation;
	health: number;
	maxHealth: number;
	despawn: boolean;
	zIndex = 0;

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
		this.despawn = minEntity.despawn;
	}

	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}