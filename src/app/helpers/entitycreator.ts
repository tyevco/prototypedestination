
import { Mesh, Vertex } from "../../orion/drawing";
import { Entity } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";
import { Camera, Physics, RigidBody, Selectable, Sprite, UnitType } from "../components";

export class EntityCreator {
    public static createPlayer(): Entity {
        const entity: Entity = new Entity();

        entity.addComponent(new Selectable());

        const physics: Physics = new Physics();
        physics.Velocity = new Vector2(0, 0);
        entity.addComponent(physics);

        const rigidBody: RigidBody = new RigidBody();
        rigidBody.Rotation = 0;
        rigidBody.WorldPosition = new Vector2(0, 0);
        entity.addComponent(rigidBody);

        const sprite: Sprite = new Sprite(
            new Mesh(
                new Vertex(0, 0),
                new Vertex(1, 0),
                new Vertex(1, 1),
                new Vertex(0, 1),
            ),
        );

        entity.addComponent(sprite);
        return entity;
    }

    public createCamera(): Entity {
        const entity: Entity = new Entity();

        const camera: Camera = new Camera();
        camera.WorldPosition = new Vector2(0, 0);
        camera.ScreenPosition = new Vector2(0, 0);
        camera.ViewportSize = new Vector2(100, 100);
        camera.ViewportUnits = UnitType.Percent;
        entity.addComponent(camera);

        return entity;
    }
}
