import { Player } from "../entities";
import { GameObject } from "../../types/objects";
import { MinGameObject } from "../../types/minimized";
import { circleFromCenter } from "../../utils";

const treeImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
treeImg.onload = () => treeImg.loaded = true;
treeImg.src = "assets/images/game/objects/tree.svg";

const treeResidueImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
treeResidueImg.onload = () => treeResidueImg.loaded = true;
treeResidueImg.src = "assets/images/game/objects/residues/tree.png";

export default class Tree extends GameObject {
	type = "tree";
	zIndex = 1000;

	constructor(minObject: MinGameObject) {
		super(minObject);
		if (this.despawn) this.zIndex = 0;
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		if (!treeImg.loaded || !treeResidueImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		const img = this.despawn ? treeResidueImg : treeImg;
		const width = scale * this.hitbox.comparable * 2 * (this.despawn ? 1 : 3.6), height = width * img.naturalWidth / img.naturalHeight;
		ctx.drawImage(img, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
	}

	renderMap(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.fillStyle = "#3e502e";
		circleFromCenter(ctx, this.position.x * scale, this.position.y * scale, 1.5 * scale * 3.6);
	}
}