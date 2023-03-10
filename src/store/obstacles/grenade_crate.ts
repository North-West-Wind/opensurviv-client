import { RectHitbox } from "../../types/math";
import { Obstacle } from "../../types/obstacle";
import { Player } from "../entities";

const GrenadeCrateImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
GrenadeCrateImg.onload = () => GrenadeCrateImg.loaded = true;
GrenadeCrateImg.src = "assets/images/game/objects/grenade_crate.png";

const GrenadeCrateResidueImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
GrenadeCrateResidueImg.onload = () => GrenadeCrateResidueImg.loaded = true;
GrenadeCrateResidueImg.src = "assets/images/game/objects/residues/crate.svg";

export default class GrenadeCrate extends Obstacle {
	type = "grenade_crate";

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		if (!GrenadeCrateImg.loaded || !GrenadeCrateResidueImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * (<RectHitbox>this.hitbox).width * (this.despawn ? 0.5 : 1), height = width * GrenadeCrateImg.naturalWidth / GrenadeCrateImg.naturalHeight;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.drawImage(this.despawn ? GrenadeCrateResidueImg : GrenadeCrateImg, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
	}

	renderMap(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.translate(this.position.x * scale, this.position.y * scale);
		ctx.fillStyle = "#46502d";
		ctx.fillRect(-1.5 * scale, -1.5 * scale, 3 * scale, 3 * scale);
		ctx.resetTransform();
	}
}