import { Mesh } from "../../orion/drawing";
import { Component } from "../../orion/ents";

export class Sprite extends Component {
    public Mesh: Mesh;

    constructor(mesh: Mesh) {
        super();

        this.Mesh = mesh;
    }
}
