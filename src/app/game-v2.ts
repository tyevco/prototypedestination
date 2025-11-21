import { EngineBuilder, Engine } from "orion-ecs";
import { Canvas2DRendererPlugin, Transform, Camera, Sprite, ScreenElement, Unit } from "@orion-ecs/canvas2d-renderer";
import { InputManagerPlugin } from "@orion-ecs/input-manager";
import { Vector2, Mesh, Vertex, Color } from "@orion-ecs/utils";
import { CanvasContextHelper } from "./helpers/canvascontext";

// Custom component for our game
class RigidBody {
    public Velocity: Vector2 = new Vector2(0, 0);

    constructor(vx: number = 0, vy: number = 0) {
        this.Velocity = new Vector2(vx, vy);
    }
}

export class GameV2 {
    private engine: Engine;
    private canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = CanvasContextHelper.getCanvas();

        // Build the engine with plugins
        this.engine = new EngineBuilder()
            .withFixedUpdateFPS(20)  // 50ms interval = 20 FPS
            .withDebugMode(true)
            .use(new Canvas2DRendererPlugin())
            .use(new InputManagerPlugin())
            .build();

        // Configure the canvas for plugins after engine is built
        (this.engine as any).canvas2d.setCanvas(this.canvas);
        (this.engine as any).input.setCanvas(this.canvas);
    }

    public initialize(): void {
        // Register our custom components
        this.engine.registerComponent(RigidBody);

        // Create systems
        this.createPhysicsSystem();
        this.createCameraDebugSystem();

        // Create entities
        this.createPlayer();
        this.createCreatures();
        this.createCameras();
    }

    private createPhysicsSystem(): void {
        this.engine.createSystem('PhysicsEngine',
            { all: [Transform, RigidBody] },
            {
                priority: 100,
                act: (entity, transform: Transform, body: RigidBody) => {
                    transform.x += body.Velocity.x;
                    transform.y += body.Velocity.y;
                }
            }
        );
    }

    private createCameraDebugSystem(): void {
        const context = CanvasContextHelper.get2dContext();

        this.engine.createSystem('CameraDebugRenderer',
            { all: [Camera, Transform, ScreenElement] },
            {
                priority: -50, // Run after main rendering
                act: (entity, camera: Camera, transform: Transform, screenElement: ScreenElement) => {
                    // Get canvas dimensions
                    const canvas = this.canvas;

                    // Calculate screen position
                    let screenLeft = 0;
                    let screenTop = 0;
                    let screenWidth = 0;
                    let screenHeight = 0;

                    if (screenElement.unit === Unit.Percentage) {
                        screenLeft = Math.floor(canvas.width * (screenElement.left / 100));
                        screenTop = Math.floor(canvas.height * (screenElement.top / 100));
                        screenWidth = Math.floor(canvas.width * (screenElement.width / 100));
                        screenHeight = Math.floor(canvas.height * (screenElement.height / 100));
                    } else {
                        screenLeft = screenElement.left;
                        screenTop = screenElement.top;
                        screenWidth = screenElement.width;
                        screenHeight = screenElement.height;
                    }

                    const halfWidth = screenWidth / 2;
                    const halfHeight = screenHeight / 2;

                    // Calculate projection for camera center
                    const projection = new Vector2(
                        screenLeft - transform.x + halfWidth,
                        screenTop - transform.y + halfHeight
                    );

                    // Draw camera center as pink dot
                    context.fillStyle = "pink";
                    context.strokeStyle = "black";
                    context.fillRect(transform.x + projection.x - 2.5, transform.y + projection.y - 2.5, 5, 5);
                    context.strokeRect(transform.x + projection.x - 2.5, transform.y + projection.y - 2.5, 5, 5);

                    // Draw world bounds
                    const worldLeft = transform.y - halfWidth;
                    const worldTop = transform.x - halfHeight;
                    context.strokeRect(
                        projection.x + worldLeft,
                        projection.y + worldTop,
                        screenWidth,
                        screenHeight
                    );
                }
            }
        );
    }

    private createPlayer(): void {
        const playerMesh = this.generateStandardShipMesh("black");

        const player = this.engine.createEntity('Player')
            .addComponent(Transform, 0, 0)
            .addComponent(RigidBody, 0, 0)
            .addComponent(Sprite, playerMesh)
            .addTag('player');
    }

    private createCreatures(): void {
        // Use bulk entity creation for better performance
        const creatures: any[] = [];

        for (let i = 0; i < 1000; i++) {
            const leftRightSide = this.getRandomPositiveOrNegative();
            const topBottomSide = this.getRandomPositiveOrNegative();
            const x = this.getRandomNumberInRange(50, 1500) * leftRightSide;
            const y = this.getRandomNumberInRange(50, 1500) * topBottomSide;

            const mesh = this.generateStandardShipMesh();

            const creature = this.engine.createEntity(`Creature_${i}`)
                .addComponent(Transform, x, y)
                .addComponent(RigidBody, 0, 0)
                .addComponent(Sprite, mesh)
                .addTag('creature');

            creatures.push(creature);
        }
    }

    private createCameras(): void {
        // Left camera (0-50% of screen)
        const leftCamera = this.engine.createEntity('LeftCamera')
            .addComponent(Transform, 0, 0)
            .addComponent(Camera, 800, 600)
            .addComponent(ScreenElement, 0, 0, 50, 100, Unit.Percentage)
            .addTag('camera');

        // Right camera (50-100% of screen)
        const rightCamera = this.engine.createEntity('RightCamera')
            .addComponent(Transform, 0, 0)
            .addComponent(Camera, 800, 600)
            .addComponent(ScreenElement, 50, 0, 50, 100, Unit.Percentage)
            .addTag('camera');
    }

    private generateStandardShipMesh(color: string | null = null): Mesh {
        const mesh = new Mesh(
            new Vertex(0, -25),
            new Vertex(5, -5),
            new Vertex(16, 8),
            new Vertex(20, 15),
            new Vertex(4, 11),
            new Vertex(4, 14),
            new Vertex(-4, 14),
            new Vertex(-4, 11),
            new Vertex(-20, 15),
            new Vertex(-16, 8),
            new Vertex(-5, -5)
        );

        if (color == null) {
            mesh.color = this.getRandomColor();
        } else {
            mesh.color = new Color(color);
        }

        return mesh;
    }

    private getRandomNumberInRange(lower: number, upper: number): number {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    private getRandomPositiveOrNegative(): number {
        return 1 + (2 * (Math.floor(Math.random() * 2) - 1));
    }

    private getRandomColor(alpha: number = 1): Color {
        return new Color(
            this.getRandomNumberInRange(0, 256),
            this.getRandomNumberInRange(0, 256),
            this.getRandomNumberInRange(0, 256),
            alpha
        );
    }

    public begin(): void {
        this.engine.start();
    }
}
