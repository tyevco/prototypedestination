import { component } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";

@component
export class Transform {
    public Position: Vector2;
    public Rotation: number;
    public Scale: number;
}