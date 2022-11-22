import { Player } from "../entities";
import { GameObject } from "../../types/objects";

const bushImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
bushImg.onload = () => bushImg.loaded = true;
bushImg.src = "assets/images/game/objects/bush.png";

// Bush
export default class Bush extends GameObject {
	type = "bush";

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void {
		if (!bushImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * this.hitbox.comparable() * 3, height = width * bushImg.naturalWidth / bushImg.naturalHeight;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.drawImage(bushImg, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
	}
}