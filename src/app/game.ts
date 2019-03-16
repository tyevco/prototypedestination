import { Engine, System, Component } from "../lib/ents";
import { SpriteRenderer } from "./systems/spriterenderer";

export default class Game {
    engine: Engine;

    constructor() {
        this.engine = new Engine();

        
    }

    initialize() : void {
        
        this.engine.addSystem(new SpriteRenderer())
    }
}