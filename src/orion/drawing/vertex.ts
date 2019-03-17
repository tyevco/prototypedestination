import { Vector2 } from "../spatial/Vector2";


export class Vertex {
    position: Vector2;

    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
    }
}