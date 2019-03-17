import { Vector2 } from "../spatial";


export class Vertex {
    position: Vector2;

    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
    }
}