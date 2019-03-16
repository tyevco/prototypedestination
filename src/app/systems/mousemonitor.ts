import { System } from "../../lib/ents/system";
import { CanvasContextHelper } from "../helpers/canvascontext";
import { IMouseHandler } from "../../lib/lang";


export class MouseMonitor extends System implements IMouseHandler {

    constructor() {
        super();

        let canvas = CanvasContextHelper.getCanvas();
        canvas.addEventListener("mousedown", e => this.onMouseDown(e), false);
        canvas.addEventListener("mouseup", e => this.onMouseUp(e), false);
        canvas.addEventListener("mousemove", e => this.onMouseMove(e), false);
        canvas.addEventListener("mouseenter", e => this.onMouseEnter(e), false);
        canvas.addEventListener("mouseleave", e => this.onMouseLeave(e), false);
    }

    onMouseDown(event: MouseEvent): void {
        console.log(event);

        this.mouseDown = true;

    }

    onMouseUp(event: MouseEvent): void {
        console.log(event);

        this.mouseDown = false;
    }

    onMouseMove(event: MouseEvent): void {

    }

    onMouseEnter(event: MouseEvent): void {
    }

    onMouseLeave(event: MouseEvent): void {
    }

    before(): void {

    }
}