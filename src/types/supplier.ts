import { Entity } from "./entity";
import { MinEntity, MinWeapon } from "./minimized";
import { Weapon } from "./weapon";

interface Supplier<T> {
	create(...arg: any[]): T;
}

export interface EntitySupplier extends Supplier<Entity> {
	create(minEntity: MinEntity & any): Entity;
}

export interface WeaponSupplier extends Supplier<Weapon> {
	create(minWeapon: MinWeapon & any): Weapon;
}