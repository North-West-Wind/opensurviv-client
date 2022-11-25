import { Player } from "../entities";
import { GameObject } from "../../types/objects";
import { MinGameObject } from "../../types/minimized";

const bushImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
bushImg.onload = () => bushImg.loaded = true;
bushImg.src = "assets/images/game/objects/bush.png";

const bushResidueImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
bushResidueImg.onload = () => bushResidueImg.loaded = true;
bushResidueImg.src = "assets/images/game/objects/residues/bush.png";

// Bush
export default class Bush extends GameObject {
	type = "bush";
	zIndex = 10;

	constructor(minObject: MinGameObject) {
		super(minObject);
		if (this.despawn) this.zIndex = 0;
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void {
		if (!bushImg.loaded || !bushResidueImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		const img = this.despawn ? bushResidueImg : bushImg;
		// Times 2 because radius * 2 = diameter
		const width = scale * this.hitbox.comparable * 2 * (this.despawn ? 0.5 : 1), height = width * img.naturalWidth / img.naturalHeight;
		ctx.drawImage(img, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
	}
}