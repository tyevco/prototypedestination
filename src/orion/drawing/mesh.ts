import { Vertex } from "./vertex";
import { Color } from ".";

export class Mesh {
    public Vertices: Array<Vertex> = new Array<Vertex>();
    public Color: Color;

    constructor(...vertices: Array<Vertex>) {
        this.Vertices = vertices;
    }
}
