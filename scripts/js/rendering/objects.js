const treeImg = new Image();
const bushImg = new Image();
bushImg.onload = () => bushImg.loaded = true;
bushImg.src = "assets/images/Bush.png";
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
 * Draws a bush
 * @param {Bush} bush
*/
function drawTree(you, tree, canvas, ctx, scale) {
	if (!treeImg.loaded) return;
	const relative = tree.position.addVec(you.position.inverse());
	const width = scale * tree.hitbox.comparable() * 10, height = width * treeImg.naturalWidth / treeImg.naturalHeight;
	const x = (canvas.width - width) / 2 + relative.x * scale, y = (canvas.height - height) / 2 + relative.y * scale;
	ctx.drawImage(treeImg, x, y, width, height);
}
function drawBush(you, bush, canvas, ctx, scale){
    if (!bushImg.loaded) return;
	const relative = bush.position.addVec(you.position.inverse());
	const width = scale * bush.hitbox.comparable() * 3, height = width * bushImg.naturalWidth / bushImg.naturalHeight;
	const x = (canvas.width - width) / 4 + relative.x * scale, y = (canvas.height - height) / 4 + relative.y * scale;
	ctx.drawImage(bushImg, x, y, width, height);

}
