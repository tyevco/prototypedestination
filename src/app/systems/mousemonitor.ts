import { System } from "../../orion/ents/system";
import { CanvasContextHelper } from "../helpers/canvascontext";
import { IMouseHandler } from "../../orion/lang";
import { Vector2 } from "../../orion/spatial/Vector2";


export class MouseMonitor extends System {
    protected mouseDown: boolean = false;
    protected downPosition: Vector2 = null;
    protected currentPosition: Vector2 = Vector2.Zero;

    constructor() {
        super();

        let canvas: HTMLCanvasElement = CanvasContextHelper.getCanvas();
    }

}