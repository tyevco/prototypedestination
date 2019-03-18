import { InputSystem, usesComponents, Entity } from "../../orion/ents";
import { MouseDragEvent } from "../../orion/input";
import { Vector2 } from "../../orion/spatial";
import { Camera, ScreenElement, Transform } from "../components";

@usesComponents(Camera, ScreenElement, Transform)
export class MouseMonitor extends InputSystem {
    private dragEvent: MouseDragEvent;

    public onDrag(dragEvent: MouseDragEvent): void {
        this.dragEvent = dragEvent;
    }

    public onMouseUp(): void {
        this.dragEvent = null;
    }


    public act(entity: Entity, camera: Camera, screenElement: ScreenElement, transform: Transform): void {
        console.log(this.dragEvent);
    }
}
