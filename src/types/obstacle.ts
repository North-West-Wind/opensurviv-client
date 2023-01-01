import { Player } from "../store/entities";
import { CircleHitbox, Hitbox, RectHitbox, Vec2 } from "./math";
import { MinCircleHitbox, MinObstacle, MinRectHitbox } from "./minimized";
import { Renderable, RenderableMap } from "./render";

// Obstacles inside the game
export abstract class Obstacle implements Renderable, RenderableMap {
	type = "";
	position: Vec2;
	direction: Vec2;
	hitbox: Hitbox;
	despawn: boolean;
	zIndex = 0;

	constructor(minObstacle: MinObstacle) {
		this.type = minObstacle.type;
		this.position = new Vec2(minObstacle.position.x, minObstacle.position.y);
		this.direction = new Vec2(minObstacle.direction.x, minObstacle.direction.y);
		if (minObstacle.hitbox.type === "rect") {
			const rect = <MinRectHitbox> minObstacle.hitbox;
			this.hitbox = new RectHitbox(rect.width, rect.height);
		} else {
			const circle = <MinCircleHitbox> minObstacle.hitbox;
			this.hitbox = new CircleHitbox(circle.radius);
		}
		this.despawn = minObstacle.despawn;
	}

	abstract render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;

	abstract renderMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number): void;
}

// Dummy obstacle for default casting
export class DummyObstacle extends Obstacle {
	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
	renderMap(_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}