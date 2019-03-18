import { InputSystem, usesComponents, Entity } from "../../orion/ents";
import { MouseDragEvent } from "../../orion/input";
import { Vector2 } from "../../orion/spatial";
import { Camera, ScreenElement, Transform } from "../components";

@usesComponents(Camera, ScreenElement, Transform)
export class MouseMonitor extends InputSystem {
    protected mouseDown: boolean = false;
    protected downPosition: Vector2 = null;
    protected currentPosition: Vector2 = Vector2.Zero;

    public onDrag(dragEvent: MouseDragEvent): void {
        console.log(dragEvent);
    }

    public act(entity: Entity, camera: Camera, screenElement: ScreenElement, transform: Transform): void {
        // console.log(entity.id);
    }
}
