import { System } from "../../lib/ents/system";
import CanvasContextHelper from "../helpers/canvascontext";

// Sprite, Location
export class SpriteRenderer extends System {
    context: CanvasRenderingContext2D;

    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
    }
}