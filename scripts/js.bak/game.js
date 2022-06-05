
import * as msgpack from "msgpack-lite";
/// <reference path="./types/entities">
/// <reference path="./types/packets">
import { Entity, Player } from "./types/entities";
import { GamePacket, MouseMovePacket, MovementPressPacket, MovementReleasePacket, PingPacket } from "./types/packets";
// Address for debugging
const ws = new WebSocket("ws://localhost:8080");
ws.binaryType = "arraybuffer";

var id: string, size: number[], connected = false, entities: Entity[] = [], player: Player;
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
			const packet = <GamePacket>data;
			entities = packet.entities;
			player = packet.player;
		}
	}
}

ws.onclose = () => connected = false;

const movementKeys = [68, 87, 65, 83];
window.onkeydown = (event: KeyboardEvent) => {
	if (!connected) return;
	if (movementKeys.includes(event.keyCode)) ws.send(msgpack.encode(new MovementPressPacket(movementKeys.indexOf(event.keyCode))).buffer);
}
window.onkeyup = (event: KeyboardEvent) => {
	if (!connected) return;
	if (movementKeys.includes(event.keyCode)) ws.send(msgpack.encode(new MovementReleasePacket(movementKeys.indexOf(event.keyCode))).buffer);
}
window.onmousemove = (event: MouseEvent) => {
	if (!connected) return;
	ws.send(msgpack.encode(new MouseMovePacket(event.x - window.innerWidth / 2, event.y - window.innerHeight / 2)).buffer);
}

export function getData() {
	return { entities, player };
}