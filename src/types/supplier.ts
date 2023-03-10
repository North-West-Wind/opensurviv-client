import { Entity } from "./entity";
import { MinEntity, MinObstacle, MinWeapon } from "./minimized";
import { Obstacle } from "./obstacle";
import { Weapon } from "./weapon";

interface Supplier<T> {
	create(...arg: any[]): T;
}

export interface EntitySupplier extends Supplier<Entity> {
	create(minEntity: MinEntity & any): Entity;
}

export interface ObstacleSupplier extends Supplier<Obstacle> {
	create(minObstacle: MinObstacle & any): Obstacle;
}

export interface WeaponSupplier extends Supplier<Weapon> {
	create(minWeapon: MinWeapon & any): Weapon;
}