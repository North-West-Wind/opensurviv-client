// Address for debugging
const ws = new WebSocket("ws://localhost:8080");
ws.binaryType = "arraybuffer";

/** @type {string} */
var id;
/** @type {number[]} */
var size;
/** @type {Player} */
var player;
/** @type {Entity[]} */
var entities = [];
/** @type {GameObject[]} */
var objects = [];
/** @type {number} */
var ticks = 0;
var connected = false;
ws.onmessage = (event) => {
	const data = msgpack.decode(new Uint8Array(event.data));
	id = data.id;
	size = data.size;
	ws.send(msgpack.encode({ id }).buffer);
	connected = true;

	const interval = setInterval(() => {
		if (connected) ws.send(msgpack.encode(new PingPacket()).buffer);
		else clearInterval(interval);
	}, 1000);

	ws.onmessage = (event) => {
		const data = msgpack.decode(new Uint8Array(event.data));
		switch (data.type) {
			case "game":
				/** @type {GamePacket} */
				const gamePkt = data;
				entities = gamePkt.entities.map(entity => {
					const copy = entity;
					for (const prop in ENTITY_ASSIGNS) copy[prop] = ENTITY_ASSIGNS[prop](entity[prop]);
					return copy;
				});
				objects = gamePkt.objects.map(object => {
					const copy = object;
					for (const prop in OBJECT_ASSIGNS) copy[prop] = OBJECT_ASSIGNS[prop](object[prop]);
					return copy;
				});
				player = gamePkt.player;
				for (const prop in ENTITY_ASSIGNS) player[prop] = ENTITY_ASSIGNS[prop](player[prop]);
				break;
			case "map":
				/** @type {MapPacket} */
				const mapPkt = data;
		}
	}
}

ws.onclose = () => connected = false;

const movementKeys = ["d", "w", "a", "s"];
const movementSent = [false, false, false, false];
/** @param {KeyboardEvent} event */
window.onkeydown = (event) => {
	if (!connected) return;
	const index = movementKeys.indexOf(event.key);
	if (index >= 0 && !movementSent[index]) {
		ws.send(msgpack.encode(new MovementPressPacket(index)).buffer);
		movementSent[index] = true;
	}
}
/** @param {KeyboardEvent} event */
window.onkeyup = (event) => {
	if (!connected) return;
	const index = movementKeys.indexOf(event.key);
	if (index >= 0) {
		ws.send(msgpack.encode(new MovementReleasePacket(index)).buffer);
		movementSent[index] = false;
	}
}
/** @param {MouseEvent} event */
window.onmousemove = (event) => {
	if (!connected) return;
	ws.send(msgpack.encode(new MouseMovePacket(event.x - window.innerWidth / 2, event.y - window.innerHeight / 2)).buffer);
}

/** @param {MouseEvent} event */
window.onmousedown = (event) => {
	if (!connected) return;
	ws.send(msgpack.encode(new MousePressPacket(event.button)));
}

/** @param {MouseEvent} event */
window.onmouseup = (event) => {
	if (!connected) return;
	ws.send(msgpack.encode(new MouseReleasePacket(event.button)));
}
// /** @param {MouseEvent} event */
// window.oncontextmenu = (event) => {
// 	if (!connected) return;
// 	ws.send(msgpack.encode(new PingPacket(event.button)))
// }