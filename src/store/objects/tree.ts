import { Player } from "../entities";
import { GameObject } from "../../types/objects";

const treeImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
treeImg.onload = () => treeImg.loaded = true;
treeImg.src = "assets/images/tree.svg";

export default class Tree extends GameObject {
	type = "tree";

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		if (!treeImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * this.hitbox.comparable() * 10, height = width * treeImg.naturalWidth / treeImg.naturalHeight;
		const x = (canvas.width - width) / 2 + relative.x * scale, y = (canvas.height - height) / 2 + relative.y * scale;
		ctx.drawImage(treeImg, x, y, width, height);
	}
}