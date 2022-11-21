import { Player } from "../store/entities";
import { CircleHitbox, Hitbox, RectHitbox, Vec2 } from "./maths";
import { MinCircleHitbox, MinGameObject, MinRectHitbox } from "./minimized";

// Objects inside the game
export class GameObject {
	type = "";
	position: Vec2;
	hitbox: Hitbox;

	constructor(minObject: MinGameObject) {
		this.type = minObject.type;
		this.position = new Vec2(minObject.position.x, minObject.position.y);
		if (minObject.hitbox.type === "rect") {
			const rect = <MinRectHitbox> minObject.hitbox;
			this.hitbox = new RectHitbox(rect.width, rect.height);
		} else {
			const circle = <MinCircleHitbox> minObject.hitbox;
			this.hitbox = new CircleHitbox(circle.radius);
		}
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) { };
}