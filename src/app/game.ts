import { Engine, System, Component } from "../lib/ents";
import { SpriteRenderer } from "./systems/spriterenderer";
import { PhysicsEngine } from "./systems/physicsengine";
import { MouseMonitor } from "./systems/mousemonitor";
import { EntityCreator } from "./helpers/entitycreator";

export default class Game {
    engine: Engine;

    constructor() {
        this.engine = new Engine();

        
    }

    initialize() : void {
        this.engine.addSystem(new SpriteRenderer());
        this.engine.addSystem(new PhysicsEngine());
        this.engine.addSystem(new MouseMonitor());


        this.engine.addEntity(EntityCreator.createPlayer());
    }

    begin() : void {
        this.engine.run(50);
    }
}