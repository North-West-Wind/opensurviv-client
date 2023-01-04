import { MinTerrain } from "../../types/minimized";
import Plain from "./plain";
import Pond from "./pond";
import River, { RiverSegment } from "./river";

export { default as Plain } from "./plain";
export { default as Pond } from "./pond";
export { RiverSegment } from "./river";
export { default as River } from "./river";

export function castCorrectTerrain(minTerrain: MinTerrain & any) {
	switch (minTerrain.id) {
		case "plain":
			return new Plain(minTerrain);
		case "pond":
			return new Pond(minTerrain);
		case "river_segment":
			return new RiverSegment(minTerrain);
		case "river":
			return new River(minTerrain);
		default:
			return new Plain(minTerrain);
	}
}