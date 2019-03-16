import { System, usesComponents, usesComponentsBefore } from "../../lib/ents/system";
import { CanvasContextHelper } from "../helpers/canvascontext";
import { Entity } from "../../lib/ents";
import { Sprite, RigidBody, Camera } from "../components";

@usesComponentsBefore(Camera.Name)
@usesComponents(Sprite.Name, RigidBody.Name)
export class SpriteRenderer extends System {
    context: CanvasRenderingContext2D;

    constructor() {
        super();

        this.context = CanvasContextHelper.get2dContext();
    }

    act(entity: Entity, sprite: Sprite, body: RigidBody): void {

    }
}