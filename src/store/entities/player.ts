import { Entity, Inventory } from "../../types/entity";
import { MinEntity, MinInventory } from "../../types/minimized";
import { circleFromCenter } from "../../utils";
import { Fists } from "../weapons";

const deathImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
deathImg.onload = () => deathImg.loaded = true;
deathImg.src = "assets/images/game/entities/death.svg";

interface AdditionalEntity {
	id: string;
	username: string;
	boost: number;
	scope: number;
	inventory: MinInventory;
}

export default class Player extends Entity {
	type = "player";
	id: string;
	username: string;
	boost: number;
	scope: number;
	inventory: Inventory;
	zIndex = 9;

	constructor(minEntity: (MinEntity & AdditionalEntity) | Player) {
		super(minEntity);
		this.id = minEntity.id;
		this.username = minEntity.username;
		this.boost = minEntity.boost;
		this.scope = minEntity.scope;
		if (typeof minEntity.inventory.holding === "number") {
			const weapon = (<any> minEntity.inventory).weapons[minEntity.inventory.holding];
			this.inventory = new Inventory({ holding: weapon });
		} else this.inventory = new Inventory(minEntity.inventory);
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		const radius = scale * this.hitbox.comparable;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		if (!this.despawn) {
			ctx.rotate(-this.direction.angle());
			ctx.fillStyle = "#F8C675";
			circleFromCenter(ctx, 0, 0, radius);
			// We will leave the transform for the weapon
			// If player is holding nothing, render fist
			(this.inventory.holding || new Fists()).render(this, canvas, ctx, scale);
			ctx.resetTransform();
		} else {
			ctx.drawImage(deathImg, -radius * 2, -radius * 2, radius * 4, radius * 4);
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.font = `700 ${scale}px Jura`;
			ctx.fillStyle = "#60605f";
			ctx.fillText(this.username, 2, radius * 2 + 2);
			ctx.fillStyle = "#80807f"
			ctx.fillText(this.username, 0, radius * 2);
			ctx.resetTransform();
		}
	}
}