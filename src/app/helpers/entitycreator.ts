
import { Mesh, Vertex } from "../../orion/drawing";
import { Entity } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";
import { Camera, RigidBody, Selectable, Sprite, UnitType, Transform, ScreenElement } from "../components";

export class EntityCreator {
    public static createPlayer(): Entity {
        const entity: Entity = new Entity();

        const sprite: Sprite = new Sprite(
            new Mesh(
                new Vertex(0, 0),
                new Vertex(1, 0),
                new Vertex(1, 1),
                new Vertex(0, 1),
            ),
        );

        entity
            .addComponent(new Selectable())
            .addComponent(this.createRigidBodyComponent(0, 0))
            .addComponent(this.createTransformComponent(0, 0))
            .addComponent(sprite);

        return entity;
    }

    public static createCamera(): Entity {
        const entity: Entity = new Entity();

        const camera: Camera = new Camera();

        entity
            .addComponent(camera)
            .addComponent(this.createTransformComponent(0, 0))
            .addComponent(this.createScreenElementComponent(0, 0, 100, 100, UnitType.Percent));

        return entity;
    }

    private static createRigidBodyComponent(dx: number, dy: number): RigidBody {
        const rigidBody: RigidBody = new RigidBody();
        rigidBody.Velocity = new Vector2(dx, dy);

        return rigidBody;
    }

    private static createTransformComponent(x: number, y: number, theta: number = 0, scale: number = 1): Transform {
        const transform: Transform = new Transform();
        transform.Rotation = theta;
        transform.Position = new Vector2(x, y);
        transform.Scale = scale;

        return transform;
    }

    private static createScreenElementComponent(x: number, y: number, width: number, height: number, unitType: UnitType, theta: number = 0, scale: number = 1): ScreenElement {
        const element: ScreenElement = new ScreenElement();

        element.Position = new Vector2(x, y);
        element.Size = new Vector2(width, height);
        element.Scale = scale;
        element.Rotation = theta;
        element.SizeUnits = unitType;

        return element;
    }
}
