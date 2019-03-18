import { Entity, System, usesComponents, usesComponentsBefore } from "../../orion/ents";
import { Camera, RigidBody, Sprite, Transform } from "../components";
import { CanvasContextHelper } from "../helpers/canvascontext";

@usesComponentsBefore(Camera)
@usesComponents(Sprite, RigidBody, Transform)
export class SpriteRenderer extends System {
    private context: CanvasRenderingContext2D;

    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
    }

    public act(entity: Entity, sprite: Sprite, body: RigidBody, transform: Transform): void {
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
