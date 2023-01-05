import { MinTerrain, MinVec2 } from "../../types/minimized";
import { BorderedTerrain } from "../../types/extenstions";
import { DotTerrain } from "../../types/terrain";
import { circleFromCenter } from "../../utils";
import { Player } from "../entities";

interface AdditionalTerrain {
	position: MinVec2;
	radius: number;
}

export default class Pond extends DotTerrain implements BorderedTerrain {
	id = "pond";
	color = 0x3481ab;
	secondaryColor = 0x905e26;

	constructor(minTerrain: MinTerrain & AdditionalTerrain) {
		super(minTerrain);
	}

	renderLayerN1(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.fillStyle = this.colorToHex(this.secondaryColor);
		circleFromCenter(ctx, 0, 0, (this.radius + this.border) * scale);
		ctx.resetTransform();
	}

	renderMapLayerN1(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.fillStyle = this.colorToHex(this.secondaryColor);
		circleFromCenter(ctx, this.position.x * scale, this.position.y * scale, (this.radius + this.border) * scale);
	}
}