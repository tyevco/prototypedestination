import { Vertex } from "../drawing/vertex";


export class Sprite {
    vertices: Array<Vertex> = new Array<Vertex>();
    rotation: number;
    
    constructor(...vertices: Array<Vertex>) {
        this.vertices = vertices;
    }
}