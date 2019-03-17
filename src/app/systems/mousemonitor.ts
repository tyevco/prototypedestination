import { System } from "../../lib/ents/system";
import { CanvasContextHelper } from "../helpers/canvascontext";
import { IMouseHandler } from "../../lib/lang";
import { Vector2 } from "../../lib/spatial/Vector2";


export class MouseMonitor extends System {
    protected mouseDown: boolean = false;
    protected downPosition: Vector2 = null;
    protected currentPosition: Vector2 = Vector2.Zero;

    constructor() {
        super();

        let canvas: HTMLCanvasElement = CanvasContextHelper.getCanvas();
    }

}