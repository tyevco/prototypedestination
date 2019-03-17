import { InputSystem, usesComponentsBefore } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";
import { MouseDragEvent } from "../../orion/input";
import { Camera } from "../components";


@usesComponentsBefore(Camera.Name)
export class MouseMonitor extends InputSystem {
    protected mouseDown: boolean = false;
    protected downPosition: Vector2 = null;
    protected currentPosition: Vector2 = Vector2.Zero;

    public onDrag(dragEvent: MouseDragEvent): void {
        console.log(dragEvent);
    }
}