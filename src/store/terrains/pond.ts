import { MinTerrain, MinVec2 } from "../../types/minimized";
import { RenderableLayerN1, RenderableMapLayerN1 } from "../../types/render";
import { DotTerrain } from "../../types/terrain";
import { circleFromCenter } from "../../utils";
import { Player } from "../entities";

interface AdditionalTerrain {
	position: MinVec2;
	radius: number;
}

export default class Pond extends DotTerrain implements RenderableLayerN1, RenderableMapLayerN1 {
	id = "pond";
	color = 0xFF3481ab;
	secondaryColor = 0xFF905e26;

	constructor(minTerrain: MinTerrain & AdditionalTerrain) {
		super(minTerrain);
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.fillStyle = this.colorToHex();
		circleFromCenter(ctx, 0, 0, this.radius * scale);
		ctx.resetTransform();
	}

	renderLayerN1(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.fillStyle = this.colorToHex(this.secondaryColor);
		circleFromCenter(ctx, 0, 0, (this.radius + this.border) * scale);
		ctx.resetTransform();
	}

	renderMap(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.fillStyle = this.colorToHex();
		circleFromCenter(ctx, this.position.x * scale, this.position.y * scale, this.radius * scale);
	}

	renderMapLayerN1(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.fillStyle = this.colorToHex(this.secondaryColor);
		circleFromCenter(ctx, this.position.x * scale, this.position.y * scale, (this.radius + this.border) * scale);
	}
}