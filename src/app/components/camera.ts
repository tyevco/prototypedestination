import { Component, Entity } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";


export class Camera extends Component {
    public Position: Vector2;

    public Draggable: boolean;

    public Following: Entity;
}