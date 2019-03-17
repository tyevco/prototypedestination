import { System } from "./ents/system";
import { Entity } from "./ents/entity";
import { IMouseHandler, IKeyboardHandler } from "./lang";
import { Vector2 } from "./spatial/Vector2";

export class Engine implements IMouseHandler, IKeyboardHandler {
    entities: Array<Entity> = [];
    systems: Array<System> = [];
    steps: number = 0;
    active: boolean = false;
    protected mouseDown: boolean = false;
    protected downPosition: Vector2 = null;
    protected currentPosition: Vector2 = Vector2.Zero;

    addEntity(e: Entity): Entity {
        this.entities.push(e);

        return e;
    }

    /**
     * Creates an Entity to the engine.
     */
    createEntity(): Entity {
        var entity: Entity = new Entity();
        this.entities.push(entity);

        return entity;
    }

    /***
     * Adds a System to the engine.
     */
    addSystem(system: System): Engine {
        this.systems.push(system);
        return this;
    }

    /***
     * Runs the engine at a specified interval until maxSteps is reached.
     */
    run(interval: number, maxSteps: number = 0): void {
        var self: Engine = this;

        if (maxSteps === null || maxSteps === undefined) {
            maxSteps = 0;
        }

        if (this.steps === 0) {
            this.onStart();
        }

        var stepFn: () => void = () => {
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
        for (var system of this.systems) {
            system.before();
            system.step(this.entities);
            system.after();
        }
        this.steps++;
    }

    start(): void {
        // todo: start running engine
        // console.log("start");
    }

    /***
     * onStart Hook.
     */
    onStart(): void {
        // console.log("onStart");
    }

    stop(): void {
        // todo: stop running engine
        // console.log("stop");
    }

    /***
     * onStop Hook
     */
    onStop(): void {
        // console.log("onStop");
    }

    /* Mouse Event Handlers */
    registerMouseEventHandlers(mouseEmitter: IMouseEventEmitter): void {
        mouseEmitter.addEventListener("mousedown", (e: MouseEvent) => this.onMouseDown(e), false);
        mouseEmitter.addEventListener("mouseup", (e: MouseEvent) => this.onMouseUp(e), false);
        mouseEmitter.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e), false);
        mouseEmitter.addEventListener("mouseenter", (e: MouseEvent) => this.onMouseEnter(e), false);
        mouseEmitter.addEventListener("mouseleave", (e: MouseEvent) => this.onMouseLeave(e), false);
    }

    onMouseDown(event: MouseEvent): void {
        if (!this.mouseDown) {
            this.mouseDown = true;
            // transform clientX/Y to worldX/Y.
            this.downPosition = new Vector2(event.clientX, event.clientY);
        }
    }

    onMouseUp(event: MouseEvent): void {
        this.mouseDown = false;
        this.downPosition = null;
    }

    onMouseMove(event: MouseEvent): void {
        this.currentPosition.set(event.clientX, event.clientY);
        if (this.mouseDown) {
            var dv: Vector2 = this.downPosition.vectorTo(this.currentPosition);
        }
    }

    onMouseEnter(event: MouseEvent): void {
        // console.log("NYI");
    }

    onMouseLeave(event: MouseEvent): void {
        // console.log("NYI");
    }

    /* Keyboard Event Handlers */
    registerKeyboardEventHandlers(keyboardEmitter: IKeyboardEventEmitter): void {
        keyboardEmitter.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e), false);
        keyboardEmitter.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e), false);
        keyboardEmitter.addEventListener("keypress", (e: KeyboardEvent) => this.onKeyPress(e), false);
    }

    onKeyDown(event: KeyboardEvent): void {
        // console.log("NYI");
    }

    onKeyUp(event: KeyboardEvent): void {
        // console.log("NYI");
    }

    onKeyPress(event: KeyboardEvent): void {
        // console.log("NYI");
    }
}