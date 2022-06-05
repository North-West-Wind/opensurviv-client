"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const utils_1 = require("./utils");
const canvas = document.getElementById("game");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
window.onresize = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
};
const ctx = canvas.getContext("2d");
function animate() {
    if (!ctx)
        return;
    ctx.fillStyle = "#80B251";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const data = (0, game_1.getData)();
    ctx.fillStyle = "#F8C675";
    (0, utils_1.circle)(ctx, canvas.width / 2, canvas.height / 2, canvas.width / (10 * data.player.scope));
    requestAnimationFrame(animate);
}
animate();
