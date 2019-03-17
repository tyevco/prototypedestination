import { Vector2 } from "../../lib/spatial/Vector2";
import { Component } from "../../lib/ents";

export class RigidBody extends Component {
    public Rotation: number;
    public WorldPosition: Vector2;
}