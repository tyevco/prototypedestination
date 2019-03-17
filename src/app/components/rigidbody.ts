import { Vector2 } from "../../orion/spatial";
import { Component } from "../../orion/ents";

export class RigidBody extends Component {
    public Rotation: number;
    public WorldPosition: Vector2;
}