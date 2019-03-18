import { Mesh } from "../../orion/drawing";
import { component } from "../../orion/ents";

@component
export class Sprite {
    public Mesh: Mesh;

    constructor(mesh: Mesh) {
        this.Mesh = mesh;
    }
}
