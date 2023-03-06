import { Player } from "../store/entities";
import { castCorrectWeapon } from "../store/weapons";
import { CircleHitbox, Hitbox, RectHitbox, Vec2 } from "./math";
import { MinCircleHitbox, MinEntity, MinInventory, MinRectHitbox } from "./minimized";
import { Renderable } from "./extenstions";
import { Weapon } from "./weapon";
import { GunColor } from "../constants";

// Data about animations
export interface Animation {
	name: string;
	duration: number;
}

export class Inventory {
	holding: number;
	weapons: Weapon[];
	// Array of 2 numbers. Order: gun slots, melee slots
	slots: number[];
	// Indices are colors. Refer to GunColor
	ammos: number[];
	// Utilities. Similar working to ammos, but yet to be implemented
	utilities: number[];

	constructor(holding: number, slots: number[], weapons?: Weapon[], ammos?: number[], utilities?: number[]) {
		this.holding = holding;
		this.slots = slots;
		this.weapons = weapons || Array(slots.reduce((a, b) => a + b));
		this.ammos = ammos || Array(Object.keys(GunColor).length).fill(0);
		this.utilities = utilities || []; // TODO: Use a utility enum to generate 0s
	}
}

// Inventory, mainly for players
export class PartialInventory {
	holding: Weapon;

	constructor(minInv: MinInventory) {
		this.holding = castCorrectWeapon(minInv.holding);
	}
}

// An entity with position, velocity and hitbox
export abstract class Entity implements Renderable {
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

	abstract render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;
}

export class DummyEntity extends Entity {
	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}