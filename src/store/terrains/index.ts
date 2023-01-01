import Plain from "./plain";

export { default as Plain } from "./plain";

export function getCorrectTerrain(id: string) {
	switch (id) {
		case "plain":
			return new Plain();
		default:
			return new Plain();
	}
}