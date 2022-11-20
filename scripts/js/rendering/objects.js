const treeImg = new Image();
const barrelImg = new Image();
barrelImg.onload = () => barrelImg.loaded = true;
treeImg.onload = () => treeImg.loaded = true;
treeImg.src = "assets/images/tree.svg";

/**
 * Draws a tree
 * @param {Player} you 
 * @param {Tree} tree 
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} scale 
 */
/**
 * Draws a barrel
 * @param {Player} you
 * @param {Barrel} barrel
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} scale2
*/
function drawTree(you, tree, canvas, ctx, scale) {
	if (!treeImg.loaded) return;
	const relative = tree.position.addVec(you.position.inverse());
	const width = scale * tree.hitbox.comparable() * 10, height = width * treeImg.naturalWidth / treeImg.naturalHeight;
	const x = (canvas.width - width) / 2 + relative.x * scale, y = (canvas.height - height) / 2 + relative.y * scale;
	ctx.drawImage(treeImg, x, y, width, height);
}
function drawBarrel(you, barrel, canvas, ctx, scale2){

}