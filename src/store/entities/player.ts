import { Entity, Inventory } from "../../types/entities";
import { CircleHitbox } from "../../types/maths";
import { MinEntity, MinInventory } from "../../types/minimized";
import { circleFromCenter } from "../../utils";
import { Fists } from "../weapons";

interface AdditionalEntity {
	id: string;
	boost: number;
	scope: number;
	inventory: MinInventory;
}

export default class Player extends Entity {
	type = "player";
	id: string;
	boost: number;
	scope: number;
	inventory: Inventory;

	constructor(minEntity: (MinEntity & AdditionalEntity) | Player) {
		super(minEntity);
		this.id = minEntity.id;
		this.boost = minEntity.boost;
		this.scope = minEntity.scope;
		if (typeof minEntity.inventory.holding === "number") {
			const weapon = (<any> minEntity.inventory).weapons[minEntity.inventory.holding];
			this.inventory = new Inventory({ holding: weapon });
		} else this.inventory = new Inventory(minEntity.inventory);
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		const radius = scale * this.hitbox.comparable();
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.fillStyle = "#F8C675";
		circleFromCenter(ctx, 0, 0, radius);
		ctx.resetTransform();
		// If player is holding nothing, render fist
		(this.inventory.holding || new Fists()).render(this, relative, canvas, ctx, scale);
	}
}