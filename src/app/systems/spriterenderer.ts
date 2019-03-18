import { Entity, System, usesComponents, usesComponentRegister } from "../../orion/ents";
import { Bounds, Vector2 } from "../../orion/spatial";
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

        for (const camera of this.cameras) {
            this.context.clearRect(camera.ScreenPosition.Left, camera.ScreenPosition.Top,
                camera.ScreenPosition.Width, camera.ScreenPosition.Height);
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
        cameraDetails.HalfWidth = halfWidth;
        cameraDetails.HalfHeight = halfHeight;
        cameraDetails.WorldPosition = transform.Position.clone();
        this.cameras.push(cameraDetails);
    }

    public act(entity: Entity, sprite: Sprite, body: RigidBody, transform: Transform): void {
        for (const camera of this.cameras) {
            // check if the entity bounds fall within the camera bounds.

            if (camera.WorldBounds.contains(transform.Position)) {
                // if so, render based on the camera's view

                // move to the correct screen position
                // (entity.Pos - camera.Pos) + halfLength
                var projection = new Vector2(
                    transform.Position.X - camera.WorldPosition.X + camera.HalfWidth,
                    transform.Position.Y - camera.WorldPosition.Y + camera.HalfHeight);

                this.context.moveTo(transform.Position.X, transform.Position.Y);
                this.context.beginPath();
                for (const vertex of sprite.Mesh.Vertices) {
                    const x: number = vertex.Position.X + projection.X;
                    const y: number = vertex.Position.Y + projection.Y;
                    this.context.lineTo(x, y);
                }
                this.context.fill();
                this.context.closePath();
            }
        }
    }
}

class CameraDetails {
    public ScreenPosition: Bounds;
    public WorldBounds: Bounds;
    public HalfWidth: number;
    public HalfHeight: number;
    public WorldPosition: Vector2;
}
