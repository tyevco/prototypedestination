import { System, Entity, InputSystem } from "./ents";
import { IMouseHandler, IKeyboardHandler, MouseDragEvent } from "./input";
import { Vector2 } from "./spatial";

export class Engine implements IMouseHandler, IKeyboardHandler {

    private static doRegistersMatch(first: number, second: number): boolean {
        let match: boolean = false;

        /* tslint:disable:no-bitwise*/
        if ((first & second) === first) {
            match = true;
        }
        /* tslint:enable:no-bitwise*/

        return match;
    }

    private entities: Array<Entity> = [];
    private systems: Array<System> = [];
    private inputSystems: Array<InputSystem> = [];
    private steps: number = 0;
    private active: boolean = false;

    private mouseDown: boolean = false;

    private downPosition: Vector2 = null;
    private lastPosition: Vector2 = null;
    private currentPosition: Vector2 = Vector2.Zero;

    public addEntity(e: Entity): Entity {
        this.entities.push(e);

        return e;
    }

    /**
     * Creates an Entity to the engine.
     */
    public createEntity(): Entity {
        var entity: Entity = new Entity();
        this.entities.push(entity);

        return entity;
    }

    /***
     * Adds a System to the engine.
     */
    public addSystem(system: System): Engine {
        this.systems.push(system);

        if (system instanceof InputSystem) {
            this.inputSystems.push(system as InputSystem);
        }

        return this;
    }

    /***
     * Runs the engine at a specified interval until maxSteps is reached.
     */
    public run(interval: number, maxSteps: number = 0): void {
        var self: Engine = this;

        if (maxSteps === null || maxSteps === undefined) {
            maxSteps = 0;
        }

        if (this.steps === 0) {
            this.onStart();
        }

        const stepFn: () => void = () => {
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
    public perform(): void {
        for (const entity of this.entities) {
            if (entity.isDirty()) {
                entity.updateRegistry();
            }
        }

        for (const system of this.systems) {
            system.before();
            // get the list of entities for this system
            if (typeof system.Components !== "undefined" && system.ComponentRegister > 0) {
                const length: number = this.entities.length;
                for (let i: number = length - 1; i >= 0; i--) {
                    const entity: Entity = this.entities[i];
                    if (Engine.doRegistersMatch(system.ComponentRegister, entity.ComponentRegister)) {
                        const systemArgs: Array<any> = [entity];
                        systemArgs.push(...entity.getComponents(...system.Components));
                        system.act.apply(system, systemArgs);
                    }
                }
            }
            system.after();
        }
        this.steps++;
    }

    public start(): void {
        // todo: start running engine
        // console.log("start");
    }

    public stop(): void {
        // todo: stop running engine
        // console.log("stop");
    }

    /* Mouse Event Handlers */
    public registerMouseEventHandlers(mouseEmitter: IMouseEventEmitter): void {
        mouseEmitter.addEventListener("mousedown", (e: MouseEvent) => this.onMouseDown(e), false);
        mouseEmitter.addEventListener("mouseup", (e: MouseEvent) => this.onMouseUp(e), false);
        mouseEmitter.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e), false);
        mouseEmitter.addEventListener("mouseenter", (e: MouseEvent) => this.onMouseEnter(e), false);
        mouseEmitter.addEventListener("mouseleave", (e: MouseEvent) => this.onMouseLeave(e), false);
    }

    public onMouseDown(event: MouseEvent): void {
        if (!this.mouseDown) {
            this.mouseDown = true;
            // transform clientX/Y to worldX/Y.
            this.downPosition = new Vector2(event.clientX, event.clientY);
        }
    }

    public onMouseUp(event: MouseEvent): void {
        this.mouseDown = false;
        this.downPosition = null;
        this.currentPosition = null;
        this.lastPosition = null;
    }

    public onMouseMove(event: MouseEvent): void {
        if (this.currentPosition == null) {
            this.currentPosition = new Vector2(event.clientX, event.clientY);
        } else {
            this.currentPosition.set(event.clientX, event.clientY);
        }

        if (this.mouseDown) {
            const mouseDragEvent: MouseDragEvent = MouseDragEvent.create(
                event, this.downPosition, this.currentPosition, this.lastPosition);

            for (const inputSystem of this.inputSystems) {

                inputSystem.onDrag(mouseDragEvent);
            }
        }

        if (this.lastPosition == null) {
            this.lastPosition = new Vector2(event.clientX, event.clientY);
        } else {
            this.lastPosition.set(event.clientX, event.clientY);
        }
    }

    public onMouseEnter(event: MouseEvent): void {
        // console.log("NYI");
    }

    public onMouseLeave(event: MouseEvent): void {
        // console.log("NYI");
    }

    /* Keyboard Event Handlers */
    public registerKeyboardEventHandlers(keyboardEmitter: IKeyboardEventEmitter): void {
        keyboardEmitter.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e), false);
        keyboardEmitter.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e), false);
        keyboardEmitter.addEventListener("keypress", (e: KeyboardEvent) => this.onKeyPress(e), false);
    }

    public onKeyDown(event: KeyboardEvent): void {
        // console.log("NYI");
    }

    public onKeyUp(event: KeyboardEvent): void {
        // console.log("NYI");
    }

    public onKeyPress(event: KeyboardEvent): void {
        // console.log("NYI");
    }

    /***
     * onStart Hook.
     */
    protected onStart(): void {
        // console.log("onStart");
    }

    /***
     * onStop Hook
     */
    protected onStop(): void {
        // console.log("onStop");
    }
}
