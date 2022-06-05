class Entity {
	type: string = "";
	position: Vec2;
	velocity: Vec2 = Vec2.ZERO;
	direction: Vec2 = Vec2.ONE;
	hitbox: Hitbox = CircleHitbox.ZERO;
}

class Player extends Entity {
	type = "player";
	id: string;
	health: number = 100;
	boost: number = 1;
	scope: number = 1;
}

class Bullet extends Entity {
	type = "bullet";
	damage: number;
	ticks: number;
}