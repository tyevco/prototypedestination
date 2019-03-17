import { Entity } from "../../orion/ents";
import { Player, Sprite, Physics, RigidBody, Camera } from "../components";
import { Vector2 } from "../../orion/spatial";
import { Mesh, Vertex } from "../../orion/drawing";

export class EntityCreator {
    public static createPlayer(): Entity {
        let entity: Entity = new Entity();

        entity.addComponent(new Player());

        let physics: Physics = new Physics();
        physics.Velocity = new Vector2(0, 0);
        entity.addComponent(physics);

        let rigidBody: RigidBody = new RigidBody();
        rigidBody.Rotation = 0;
        rigidBody.WorldPosition = new Vector2(0, 0);
        entity.addComponent(rigidBody);

        let sprite: Sprite = new Sprite(
            new Mesh(
                new Vertex(0, 0),
                new Vertex(1, 0),
                new Vertex(1, 1),
                new Vertex(0, 1)
            )
        );

        entity.addComponent(sprite);
        return entity;
    }

    public createCamera(): Entity {
        let entity: Entity = new Entity();

        entity.addComponent(new Camera());

        return entity;
    }
}