import { getData } from "./game";
import { circle } from "./utils";

const canvas = <HTMLCanvasElement> document.getElementById("game");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

window.onresize = () => {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
};

const ctx = canvas.getContext("2d");
function animate() {
	ctx.fillStyle = "#80B251";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const data = getData();
	ctx.fillStyle = "#F8C675";
	circle(ctx, canvas.width / 2, canvas.height / 2, canvas.width / (10 * data.player.scope));

	requestAnimationFrame(animate);
}

animate();