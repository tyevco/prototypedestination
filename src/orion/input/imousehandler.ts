export interface IMouseHandler {
    onMouseDown(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseEnter(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
}
