import Engine from "../lib/ents/engine";
import System from "../lib/ents/system";
import Component from "../lib/ents/component";


export default class Game {
    engine: Engine;

    constructor() {
        this.engine = new Engine();
    }
}