"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const msgpack = __importStar(require("msgpack-lite"));
const packets_1 = require("./types/packets");
// Address for debugging
const ws = new WebSocket("ws://localhost:8080");
ws.binaryType = "arraybuffer";
var id, size, connected = false, entities = [], player;
ws.onmessage = (event) => {
    const data = msgpack.decode(new Uint8Array(event.data));
    id = data.id;
    size = data.size;
    ws.send(msgpack.encode({ id }).buffer);
    connected = true;
    const interval = setInterval(() => {
        if (connected)
            ws.send(msgpack.encode(new packets_1.PingPacket()).buffer);
        else
            clearInterval(interval);
    }, 1000);
    ws.onmessage = (event) => {
        const data = msgpack.decode(new Uint8Array(event.data));
        if (data.type === "game") {
            const packet = data;
            entities = packet.entities;
            player = packet.player;
        }
    };
};
ws.onclose = () => connected = false;
const movementKeys = [68, 87, 65, 83];
window.onkeydown = (event) => {
    if (!connected)
        return;
    if (movementKeys.includes(event.keyCode))
        ws.send(msgpack.encode(new packets_1.MovementPressPacket(movementKeys.indexOf(event.keyCode))).buffer);
};
window.onkeyup = (event) => {
    if (!connected)
        return;
    if (movementKeys.includes(event.keyCode))
        ws.send(msgpack.encode(new packets_1.MovementReleasePacket(movementKeys.indexOf(event.keyCode))).buffer);
};
window.onmousemove = (event) => {
    if (!connected)
        return;
    ws.send(msgpack.encode(new packets_1.MouseMovePacket(event.x - window.innerWidth / 2, event.y - window.innerHeight / 2)).buffer);
};
function getData() {
    return { entities, player };
}
exports.getData = getData;
