import { Engine, System, Component } from "../lib/ents";
import { SpriteRenderer } from "./systems/spriterenderer";
import { PhysicsEngine } from "./systems/physicsengine";
import { MouseMonitor } from "./systems/mousemonitor";

export default class Game {
    engine: Engine;

    constructor() {
        this.engine = new Engine();

        
    }

    initialize() : void {
        
        this.engine.addSystem(new SpriteRenderer());
        this.engine.addSystem(new PhysicsEngine());
        this.engine.addSystem(new MouseMonitor());
    }

    begin() : void {
        this.engine.run(50);
    }
}