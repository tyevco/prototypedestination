import { Vector2 } from "../spatial/Vector2";


export class Vertex {
    position: Vector2;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.position = new Vector2(x, y);
        this.color = color;
    }
}