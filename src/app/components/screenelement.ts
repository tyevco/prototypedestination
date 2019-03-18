import { component } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";


@component
export class ScreenElement {
    public Position: Vector2;
    public Scale: number;
    public Rotation: number;

    public Size: Vector2;
    public SizeUnits: UnitType;

    public Draggable: boolean;
}

export enum UnitType {
    Percent = "percent",
    Pixels = "px",
}
