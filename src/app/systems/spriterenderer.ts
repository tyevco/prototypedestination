import { Entity, System, usesComponents, usesComponentsBefore } from "../../orion/ents";
import { Camera, RigidBody, Sprite } from "../components";
import { CanvasContextHelper } from "../helpers/canvascontext";

@usesComponentsBefore(Camera.Name)
@usesComponents(Sprite.Name, RigidBody.Name)
export class SpriteRenderer extends System {
    private context: CanvasRenderingContext2D;

    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
    }

    public act(entity: Entity, sprite: Sprite, body: RigidBody): void {
        this.context.moveTo(body.WorldPosition.X, body.WorldPosition.Y);

        for (const vertex of sprite.Mesh.Vertices) {
            const x: number = vertex.Position.X + body.WorldPosition.X;
            const y: number = vertex.Position.Y + body.WorldPosition.Y;
            this.context.lineTo(x, y);
        }
        this.context.fill();
        this.context.closePath();
    }
}
