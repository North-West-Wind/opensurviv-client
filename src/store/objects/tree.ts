import { Player } from "../entities";
import { GameObject } from "../../types/objects";

const treeImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
treeImg.onload = () => treeImg.loaded = true;
treeImg.src = "assets/images/game/objects/tree.svg";

export default class Tree extends GameObject {
	type = "tree";
	zIndex = 1000;

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		if (!treeImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * this.hitbox.comparable() * 10, height = width * treeImg.naturalWidth / treeImg.naturalHeight;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.drawImage(treeImg, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
	}
}