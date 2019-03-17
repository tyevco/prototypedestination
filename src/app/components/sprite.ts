import { Component } from "../../lib/ents";
import { Mesh } from "../../lib/drawing/mesh";


export class Sprite extends Component {
    public Mesh: Mesh;

    constructor(mesh: Mesh) {
        super();

        this.Mesh = mesh;
    }
}