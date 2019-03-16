import { Entity } from "../../lib/ents";
import { Player } from "../components/player";
import Physics from "../components/physics";
import { Vector2 } from "../spatial/Vector2";
import { Sprite } from "../components/sprite";
import { Vertex } from "../drawing/vertex";


export class EntityCreator {
    public static createPlayer(): Entity {
        let entity: Entity = new Entity();

        entity.addComponent(new Player());

        let physics = new Physics();
        physics.Rotation = 0;
        physics.WorldPosition = new Vector2(0, 0);
        physics.Velocity = new Vector2(0, 0);
        entity.addComponent(physics);

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