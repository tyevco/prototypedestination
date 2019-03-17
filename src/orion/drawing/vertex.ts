import { Vector2 } from "../spatial";

export class Vertex {
    private position: Vector2;

    public get Position(): Vector2 {
        return this.position;
    }

    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
    }
}
