import { InputSystem, usesComponents, Entity } from "../../orion/ents";
import { MouseDragEvent } from "../../orion/input";
import { Vector2, Bounds } from "../../orion/spatial";
import { Camera, ScreenElement, Transform, UnitType } from "../components";
import { CanvasContextHelper } from "../helpers/canvascontext";

@usesComponents(Camera, ScreenElement, Transform)
export class MouseMonitor extends InputSystem {
    private dragEvent: MouseDragEvent = null;

    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
        this.canvas = CanvasContextHelper.getCanvas();
    }

    public onDrag(dragEvent: MouseDragEvent): void {
        this.dragEvent = dragEvent;
    }

    public onMouseUp(): void {
        this.dragEvent = null;
    }


    public act(entity: Entity, camera: Camera, screenElement: ScreenElement, transform: Transform): void {

        console.log(this.dragEvent);
        if (this.dragEvent !== null) {

            let screenPosition: Bounds = new Bounds();
            screenPosition.Left = screenElement.Position.X;
            screenPosition.Top = screenElement.Position.Y;

            if (screenElement.SizeUnits === UnitType.Percent) {
                screenPosition.Width = Math.floor(this.canvas.width * (screenElement.Size.X / 100));
                screenPosition.Height = Math.floor(this.canvas.height * (screenElement.Size.Y / 100));
            } else if (screenElement.SizeUnits == UnitType.Pixels) {
                screenPosition.Width = screenElement.Size.X;
                screenPosition.Height = screenElement.Size.Y;
            }

            if (screenPosition.contains(this.dragEvent.StartPosition) && screenPosition.contains(this.dragEvent.Position)) {
                transform.Position.X += this.dragEvent.PreviousOffset.X;
                transform.Position.Y += this.dragEvent.PreviousOffset.Y;
            }
        }
    }

    public after(entities: Array<Entity>): void {
        this.dragEvent = null;
    }
}
