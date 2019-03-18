import { Entity, System, usesComponents, usesComponentRegister } from "../../orion/ents";
import { Camera, RigidBody, Sprite, Transform, ScreenElement } from "../components";
import { CanvasContextHelper } from "../helpers/canvascontext";

@usesComponents(Sprite, RigidBody, Transform)
@usesComponentRegister("worldCameras", Camera, ScreenElement, Transform)
export class SpriteRenderer extends System {
    private context: CanvasRenderingContext2D;
    private cameras: Array<Entity> = new Array<Entity>();
    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
    }

    public before(entities: Array<Entity>): void {
        this.cameras = entities.filter(e => e.match(this.getRegister("worldCameras")));
    }

    public act(entity: Entity, sprite: Sprite, body: RigidBody, transform: Transform): void {
        for (const camera in this.cameras) {
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
