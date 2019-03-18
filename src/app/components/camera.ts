import { component, Entity } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";

@component
export class Camera {
    public WorldPosition: Vector2;
    public ScreenPosition: Vector2;

    public Draggable: boolean;
    public Following: Entity;
    public ViewportSize: Vector2;
    public ViewportUnits: UnitType;
}

export enum UnitType {
    Percent = "percent",
    Pixels = "px",
}
