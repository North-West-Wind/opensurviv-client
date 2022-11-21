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
		if (typeof minEntity.inventory.holding === "number") this.inventory = <Inventory> (<any> minEntity.inventory).weapons[minEntity.inventory.holding];
		else this.inventory = new Inventory(minEntity.inventory);
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		const radius = scale * (<CircleHitbox>this.hitbox).radius;
		ctx.fillStyle = "#F8C675";
		circleFromCenter(ctx, canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale, radius);
		// If player is holding nothing, render fist
		console.log(this.inventory.holding);
		(this.inventory.holding || new Fists()).render(this, relative, canvas, ctx, scale);
	}
}