import { Engine } from "../orion";
import { CanvasContextHelper } from "./helpers/canvascontext";
import { EntityCreator } from "./helpers/entitycreator";
import { MouseMonitor, PhysicsEngine, SpriteRenderer } from "./systems";

export class Game {
    private engine: Engine;

    constructor() {
        this.engine = new Engine();

        this.engine.registerMouseEventHandlers(CanvasContextHelper.getCanvas());
        this.engine.registerKeyboardEventHandlers(CanvasContextHelper.getCanvas());
    }

    public initialize(): void {
        this.engine.addSystem(new SpriteRenderer());
        this.engine.addSystem(new PhysicsEngine());
        this.engine.addSystem(new MouseMonitor());

        
        this.engine.addEntity(EntityCreator.createPlayer());
        for (let i = 0; i < 1000; i++) {
            this.engine.addEntity(EntityCreator.createRandomCreature());
        }
        this.engine.addEntity(EntityCreator.createCamera());
    }

    public begin(): void {
        this.engine.run(50);
    }
}
