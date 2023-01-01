import { MinTerrain } from "../../types/minimized";
import { Terrain } from "../../types/terrain";
import { Player } from "../entities";

export default class Plain extends Terrain {
	color = 0xFF80B251;

	constructor(minTerrain: MinTerrain) {
		super(minTerrain);
	}

	render(_you: Player, _canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
	renderMap(_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _scale: number) { }
}