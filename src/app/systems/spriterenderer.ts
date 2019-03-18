import { Entity, System, usesComponents, usesComponentRegister } from "../../orion/ents";
import { Bounds } from "../../orion/spatial";
import { Camera, RigidBody, Sprite, Transform, ScreenElement, UnitType } from "../components";
import { CanvasContextHelper } from "../helpers/canvascontext";

@usesComponents(Sprite, RigidBody, Transform)
@usesComponentRegister("worldCameras", Camera, ScreenElement, Transform)
export class SpriteRenderer extends System {
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private cameras: Array<CameraDetails> = new Array<CameraDetails>();
    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
        this.canvas = CanvasContextHelper.getCanvas();
    }

    public before(entities: Array<Entity>): void {
        this.cameras = new Array<CameraDetails>();
        for (const camera of entities.filter(e => e.match(this.getRegister("worldCameras")))) {
            this.generateCameraDetails(camera);
        }
    }

    private generateCameraDetails(entity: Entity): void {
        const camera: Camera = entity.getComponent(Camera);
        const screenElement: ScreenElement = entity.getComponent(ScreenElement);
        const transform: Transform = entity.getComponent(Transform);

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
        this.cameras.push(cameraDetails);
    }

    public act(entity: Entity, sprite: Sprite, body: RigidBody, transform: Transform): void {
        for (const camera of this.cameras) {
            // check if the entity is within the camera.

            // if it is, render based on the camera's view
            this.context.moveTo(transform.Position.X, transform.Position.Y);

            for (const vertex of sprite.Mesh.Vertices) {
                const x: number = vertex.Position.X + transform.Position.X;
                const y: number = vertex.Position.Y + transform.Position.Y;
                this.context.lineTo(x, y);
            }
            this.context.fill();
            this.context.closePath();
        }
    }
}

class CameraDetails {
    public ScreenPosition: Bounds;
    public WorldBounds: Bounds;
}
