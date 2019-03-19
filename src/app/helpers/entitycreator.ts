
import { Mesh, Vertex, Color } from "../../orion/drawing";
import { Entity } from "../../orion/ents";
import { Vector2 } from "../../orion/spatial";
import { Camera, RigidBody, Selectable, Sprite, UnitType, Transform, ScreenElement } from "../components";

export class EntityCreator {
    public static createCamera(): Entity {
        return Entity.create(
            this.createCameraComponent(),
            this.createTransformComponent(0, 0),
            this.createScreenElementComponent(0, 0, 100, 100, UnitType.Percent));
    }

    public static createPlayer(): Entity {
        return Entity.create(
            this.createSelectableComponent(),
            this.createRigidBodyComponent(0, 0),
            this.createTransformComponent(0, 0),
            this.createSpriteComponent(this.createMeshComponent("black")));
    }

    public static createRandomCreature(): Entity {
        let leftRightSide: number = this.getRandomPositiveOrNegative();
        let topBottomSide: number = this.getRandomPositiveOrNegative();
        let x: number = this.getRandomNumberInRange(50, 1500);
        let y: number = this.getRandomNumberInRange(50, 1500);

        return Entity.create(
            this.createRigidBodyComponent(0, 0),
            this.createTransformComponent(x * leftRightSide, y * topBottomSide),
            this.createSpriteComponent(this.createMeshComponent()));
    }

    private static createSelectableComponent(): Selectable {
        return new Selectable();
    }

    private static createMeshComponent(color: string = null): Mesh {
        const mesh: Mesh = new Mesh(
            new Vertex(15, 0),
            new Vertex(30, 30),
            new Vertex(0, 30),
        );

        if (color == null) {
            mesh.Color = this.getRandomColor();
        } else {
            mesh.Color = new Color(color);
        }

        return mesh;
    }

    private static createSpriteComponent(mesh: Mesh): Sprite {
        const sprite: Sprite = new Sprite(mesh);

        return sprite;
    }

    private static createCameraComponent(): Camera {
        const camera: Camera = new Camera();
        return camera;
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

    private static getRandomNumberInRange(lower: number, upper: number): number {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower
    }

    private static getRandomPositiveOrNegative(): number {
        return 1 + (2 * (Math.floor(Math.random() * 2) - 1));
    }

    private static getRandomColor(alpha: number = 1): Color {
        return new Color(this.getRandomNumberInRange(0, 256),
            this.getRandomNumberInRange(0, 256),
            this.getRandomNumberInRange(0, 256),
            alpha);
    }
}
