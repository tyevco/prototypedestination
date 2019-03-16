import { Engine, System, Component } from "../lib/ents";

export default class Game {
    engine: Engine;

    constructor() {
        this.engine = new Engine();
    }
}