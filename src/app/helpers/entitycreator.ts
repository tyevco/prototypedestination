import { Entity } from "../../lib/ents";
import { Player } from "../components/player";
import Physics from "../components/physics";
import { Vector2 } from "../spatial/Vector2";
import { Sprite } from "../components/sprite";
import { Vertex } from "../drawing/vertex";
import { RigidBody } from "../components";


export class EntityCreator {
    public static createPlayer(): Entity {
        let entity: Entity = new Entity();

        entity.addComponent(new Player());

        let physics = new Physics();
        physics.Velocity = new Vector2(0, 0);
        entity.addComponent(physics);

        let rigidBody = new RigidBody();
        rigidBody.Rotation = 0;
        rigidBody.WorldPosition = new Vector2(0, 0);
        entity.addComponent(rigidBody);

        let sprite = new Sprite(
            new Vertex(0, 0),
            new Vertex(1, 0),
            new Vertex(1, 1),
            new Vertex(0, 1)
        );

        entity.addComponent(sprite);
        return entity;
    }
}