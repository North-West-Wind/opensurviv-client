import { Player } from "../store/entities";
import { CircleHitbox, Hitbox, RectHitbox, Vec2 } from "./maths";
import { MinCircleHitbox, MinGameObject, MinRectHitbox } from "./minimized";

// Objects inside the game
export class GameObject {
	type = "";
	position: Vec2;
	direction: Vec2;
	hitbox: Hitbox;
	despawn: boolean;
	zIndex = 0;

	constructor(minObject: MinGameObject) {
		this.type = minObject.type;
		this.position = new Vec2(minObject.position.x, minObject.position.y);
		this.direction = new Vec2(minObject.direction.x, minObject.direction.y);
		if (minObject.hitbox.type === "rect") {
			const rect = <MinRectHitbox> minObject.hitbox;
			this.hitbox = new RectHitbox(rect.width, rect.height);
		} else {
			const circle = <MinCircleHitbox> minObject.hitbox;
			this.hitbox = new CircleHitbox(circle.radius);
		}
		this.despawn = minObject.despawn;
	}

	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}