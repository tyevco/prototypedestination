import { System } from "./system";
import { Entity } from "./entity";

export class Engine {
    entities: Array<Entity> = [];
    systems: Array<System> = [];
    steps: number = 0;
    active: boolean = false;

    addEntity(e: Entity): Entity {
        this.entities.push(e);

        return e;
    }

    /**
     * Creates an Entity to the engine.
     */
    createEntity(): Entity {
        var entity = new Entity();
        this.entities.push(entity);

        return entity;
    }

    /***
     * Adds a System to the engine.
     */
    addSystem(system: System): Engine {
        this.systems.push(system)
        return this;
    }

    /***
     * Runs the engine at a specified interval until maxSteps is reached.
     */
    run(interval: number, maxSteps: number = 0): void {
        var self = this;

        if (maxSteps === null || maxSteps === undefined) {
            maxSteps = 0;
        }

        if (this.steps === 0) {
            this.onStart();
        }

        var stepFn = () => {
            self.perform();
            if ((self.steps < maxSteps && maxSteps !== 0) || maxSteps === 0) {
                setTimeout(stepFn, interval);
            } else {
                self.onStop();
                self.active = false;
            }
        };

        this.active = true;
        setTimeout(stepFn, interval);
    }

    /***
     * Performs a single step of the engine.
     */
    perform(): void {
        for (var id in this.systems) {
            var system = this.systems[id];
            system.before();
            system.step(this.entities);
            system.after();
        }
        this.steps++;
    }

    start(): void {
        //TODO start running engine
    }

    /***
     * onStart Hook.
     */
    onStart(): void {

    }

    stop(): void {
        //TODO stop running engine
    }

    /***
     * onStop Hook
     */
    onStop(): void {

    }
}