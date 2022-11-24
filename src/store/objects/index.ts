import { MinGameObject } from "../../types/minimized";
import { GameObject } from "../../types/objects";
import Bush from "./bush";
import Crate from "./crate";
import Tree from "./tree";

export { default as Tree } from "./tree";
export { default as Bush } from "./bush";
export { default as Crate } from "./crate";

// This still need hard-coding unfortunately
export function castCorrectObject(minObject: MinGameObject & any) {
	switch (minObject.type) {
		case "tree":
			return new Tree(minObject);
		case "bush":
			return new Bush(minObject);
		case "crate":
			return new Crate(minObject);
		default:
			return new GameObject(minObject);
	}
}