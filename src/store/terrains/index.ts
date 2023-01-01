import { MinTerrain } from "../../types/minimized";
import Plain from "./plain";
import Pond from "./pond";

export { default as Plain } from "./plain";
export { default as Pond } from "./pond";

export function castCorrectTerrain(minTerrain: MinTerrain & any) {
	switch (minTerrain.id) {
		case "plain":
			return new Plain(minTerrain);
		case "pond":
			return new Pond(minTerrain);
		default:
			return new Plain(minTerrain);
	}
}