import { System } from "../../lib/ents/system";
import { CanvasContextHelper } from "../helpers/canvascontext";


export class MouseMonitor extends System {

    constructor() {
        super();

        let canvas = CanvasContextHelper.getCanvas();
        canvas.addEventListener("mousedown", (e) => this.onMouseDown(e), false);
        canvas.addEventListener("mouseup", (e) => this.onMouseUp(e), false);
    }

    onMouseDown(event: MouseEvent): void {
        console.log(event);
    }

    onMouseUp(event: MouseEvent): void {
        console.log(event);
    }

    before(): void {

    }
}