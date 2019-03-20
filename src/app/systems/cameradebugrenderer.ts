import { Entity, System, usesComponents } from "../../orion/ents";
import { Bounds, Vector2 } from "../../orion/spatial";
import { Camera, Transform, UnitType, ScreenElement } from "../components";
import { CanvasContextHelper } from "../helpers/canvascontext";

@usesComponents(Camera, Transform)
export class CameraDebugRenderer extends System {
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
        this.canvas = CanvasContextHelper.getCanvas();
    }

    private generateCameraDetails(entity: Entity): CameraDetails {
        const camera: Camera = entity.getComponent(Camera);
        const screenElement: ScreenElement = entity.getComponent(ScreenElement);
        const transform: Transform = entity.getComponent(Transform);

        let screenPosition: Bounds = new Bounds();
        if (screenElement.SizeUnits === UnitType.Percent) {
            screenPosition.Left = Math.floor(this.canvas.width * (screenElement.Position.X / 100));
            screenPosition.Top = Math.floor(this.canvas.height * (screenElement.Position.Y / 100));
        } else if (screenElement.SizeUnits == UnitType.Pixels) {
            screenPosition.Left = screenElement.Position.X;
            screenPosition.Top = screenElement.Position.Y;
        }

        if (screenElement.SizeUnits === UnitType.Percent) {
            screenPosition.Width = Math.floor(this.canvas.width * (screenElement.Size.X / 100));
            screenPosition.Height = Math.floor(this.canvas.height * (screenElement.Size.Y / 100));
        } else if (screenElement.SizeUnits == UnitType.Pixels) {
            screenPosition.Width = screenElement.Size.X;
            screenPosition.Height = screenElement.Size.Y;
        }

        const halfHeight = screenPosition.Height / 2;
        const halfWidth = screenPosition.Width / 2;

        let worldBounds: Bounds = new Bounds();
        worldBounds.Left = transform.Position.Y - halfWidth;
        worldBounds.Top = transform.Position.X - halfHeight;
        worldBounds.Width = screenPosition.Width;
        worldBounds.Height = screenPosition.Height;

        const cameraDetails: CameraDetails = new CameraDetails();
        cameraDetails.ScreenPosition = screenPosition;
        cameraDetails.WorldBounds = worldBounds;
        cameraDetails.HalfWidth = halfWidth;
        cameraDetails.HalfHeight = halfHeight;
        cameraDetails.WorldPosition = transform.Position.clone();

        return cameraDetails;
    }

    public act(entity: Entity, camera: Camera, transform: Transform): void {
        // if so, render based on the camera's view
        let cameraDetails: CameraDetails = this.generateCameraDetails(entity);

        // move to the correct screen position
        // (entity.Pos - camera.Pos) + halfLength
        var projection = new Vector2(
            cameraDetails.ScreenPosition.Left - cameraDetails.WorldPosition.X + cameraDetails.HalfWidth,
            cameraDetails.ScreenPosition.Top - cameraDetails.WorldPosition.Y + cameraDetails.HalfHeight);


        this.context.fillStyle = "pink";
        this.context.strokeStyle = "black";
        this.context.fillRect(transform.Position.X + projection.X - 2.5, transform.Position.Y + projection.Y - 2.5, 5, 5);
        this.context.strokeRect(transform.Position.X + projection.X - 2.5, transform.Position.Y + projection.Y - 2.5, 5, 5);

        this.context.strokeRect(projection.X + cameraDetails.WorldBounds.Left, projection.Y + cameraDetails.WorldBounds.Top,
            cameraDetails.WorldBounds.Width, cameraDetails.WorldBounds.Height);
    }
}

class CameraDetails {
    public ScreenPosition: Bounds;
    public WorldBounds: Bounds;
    public HalfWidth: number;
    public HalfHeight: number;
    public WorldPosition: Vector2;
}
