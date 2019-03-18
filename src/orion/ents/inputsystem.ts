import { MouseDragEvent } from "../input";
import { System } from "./system";

export abstract class InputSystem extends System {
    public onButtonPress(): void { /**/ }
    public onClick(): void { /**/ }
    public onMouseDown(): void { /**/ }
    public onMouseUp(): void { /**/ }
    public onDrag(mouseDragEvent: MouseDragEvent): void { /**/ }
    public onKeyPress(): void { /**/ }
    public onKeyUp(): void { /**/ }
    public onKeyDown(): void { /**/ }
}
