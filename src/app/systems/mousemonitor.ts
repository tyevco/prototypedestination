import { System } from "../../lib/ents/system";
import { CanvasContextHelper } from "../helpers/canvascontext";
import { IMouseHandler } from "../../lib/lang";
import { Vector2 } from "../../lib/spatial/Vector2";


export class MouseMonitor extends System implements IMouseHandler {
    protected mouseDown: boolean = false;
    protected downPosition: Vector2 = null;
    protected currentPosition: Vector2 = Vector2.Zero;

    constructor() {
        super();

        let canvas: HTMLCanvasElement = CanvasContextHelper.getCanvas();
        canvas.addEventListener("mousedown", (e: MouseEvent) => this.onMouseDown(e), false);
        canvas.addEventListener("mouseup", (e: MouseEvent) => this.onMouseUp(e), false);
        canvas.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e), false);
        canvas.addEventListener("mouseenter", (e: MouseEvent) => this.onMouseEnter(e), false);
        canvas.addEventListener("mouseleave", (e: MouseEvent) => this.onMouseLeave(e), false);
    }

    onMouseDown(event: MouseEvent): void {
        // console.log(event);
        if (!this.mouseDown) {
            this.mouseDown = true;
            // transform clientX/Y to worldX/Y.
            this.downPosition = new Vector2(event.clientX, event.clientY);
        }
    }

    onMouseUp(event: MouseEvent): void {
        // console.log(event);

        this.mouseDown = false;


        this.downPosition = null;
    }

    onMouseMove(event: MouseEvent): void {
        this.currentPosition.set(event.clientX, event.clientY);
        if (this.mouseDown) {
            // console.log(event.clientX + "," + event.clientY);
            var dv: Vector2 = this.downPosition.vectorTo(this.currentPosition);
            // console.log(dv);
        }
    }

    onMouseEnter(event: MouseEvent): void {
        // console.log(event);
    }

    onMouseLeave(event: MouseEvent): void {
        // console.log(event);
    }

    before(): void {
        // console.log("do something...");
    }
}