import { Player } from "../entities";
import { GameObject } from "../../types/objects";

const bushImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
bushImg.onload = () => bushImg.loaded = true;
bushImg.src = "assets/images/Bush.png";

// Barrel
export default class Bush extends GameObject {
	type = "bush";

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void {
		if (!bushImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * this.hitbox.comparable() * 3, height = width * bushImg.naturalWidth / bushImg.naturalHeight;
		const x = (canvas.width - width) / 4 + relative.x * scale, y = (canvas.height - height) / 4 + relative.y * scale;
		ctx.drawImage(bushImg, x, y, width, height);
	}
}