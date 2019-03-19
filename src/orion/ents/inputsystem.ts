import { MouseDragEvent, MouseDownEvent, MouseUpEvent, MouseClickEvent } from "../input";
import { System } from "./system";

export abstract class InputSystem extends System {
    public onButtonPress(): void { /**/ }
    public onClick(mouseClickEvent: MouseClickEvent): void { /**/ }
    public onMouseDown(mouseDownEvent: MouseDownEvent): void { /**/ }
    public onMouseUp(mouseUpEvent: MouseUpEvent): void { /**/ }
    public onDrag(mouseDragEvent: MouseDragEvent): void { /**/ }
    public onKeyPress(): void { /**/ }
    public onKeyUp(): void { /**/ }
    public onKeyDown(): void { /**/ }
}
