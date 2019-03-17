import { Component } from "../../orion/ents";
import { Mesh } from "../../orion/drawing/mesh";


export class Sprite extends Component {
    public Mesh: Mesh;

    constructor(mesh: Mesh) {
        super();

        this.Mesh = mesh;
    }
}