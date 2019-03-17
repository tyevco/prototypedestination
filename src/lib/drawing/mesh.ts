import { Vertex } from "./vertex";

export class Mesh {
    public Vertices: Array<Vertex> = new Array<Vertex>();
    public Color: string = "black";

    constructor(...vertices: Vertex[]) {
        this.Vertices = vertices;
    }
}