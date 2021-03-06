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
		if (data.type === "game") {
			/** @type {GamePacket} */
			const packet = data;
			entities = packet.entities.map(entity => {
				const copy = entity;
				for (const prop in ENTITY_ASSIGNS) copy[prop] = ENTITY_ASSIGNS[prop](entity[prop]);
				return copy;
			});
			objects = packet.objects.map(object => {
				const copy = object;
				for (const prop in OBJECT_ASSIGNS) copy[prop] = OBJECT_ASSIGNS[prop](object[prop]);
				return copy;
			});
			player = packet.player;
			for (const prop in ENTITY_ASSIGNS) player[prop] = ENTITY_ASSIGNS[prop](player[prop]);
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