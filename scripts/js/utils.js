"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleFromCenter = exports.circle = exports.clamp = exports.wait = void 0;
// Promisified setTimeout
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
exports.wait = wait;
// Capping value with limits
function clamp(val, min, max) {
    if (val < min)
        return min;
    if (val > max)
        return max;
    return val;
}
exports.clamp = clamp;
// Draw circle with canvas
function circle(ctx, x, y, radius, fill = true, stroke = false) {
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false);
    if (fill)
        ctx.fill();
    if (stroke)
        ctx.stroke();
}
exports.circle = circle;
// Draw circle with x, y center
function circleFromCenter(ctx, x, y, radius, fill = true, stroke = false) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill)
        ctx.fill();
    if (stroke)
        ctx.stroke();
}
exports.circleFromCenter = circleFromCenter;
