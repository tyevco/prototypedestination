import { Vector2 } from "../../orion/spatial/Vector2";
import { Component } from "../../orion/ents";

export class RigidBody extends Component {
    public Rotation: number;
    public WorldPosition: Vector2;
}