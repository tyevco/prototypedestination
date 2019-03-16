import { Vertex } from "../drawing/vertex";
import { Component } from "../../lib/ents";


export class Sprite extends Component {
    public Vertices: Array<Vertex> = new Array<Vertex>();

    constructor(...vertices: Array<Vertex>) {
        super();
        
        this.Vertices = vertices;
    }
}