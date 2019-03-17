import { Component } from "./component";
import { Entity } from "./entity";
import { MouseDragEvent } from "../input";

export abstract class System {
    components: Array<string>;
    afterComponents: Array<string>;
    beforeComponents: Array<string>;

    before(): void { /**/ }
    act(entity: Entity, ...components: Array<Component>): void { /**/ }
    after(): void { /**/ }
}

export abstract class InputSystem extends System {
    onClick(): void { /**/ }
    onDrag(mouseDragEvent: MouseDragEvent): void { /**/ }
    onKeyPress(): void { /**/ }
    onKeyUp(): void { /**/ }
    onKeyDown(): void { /**/ }
    onButtonPress(): void { /**/ }
}


export function usesComponentsBefore<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {
    return function (constructor: T) {
        Object.assign(constructor.prototype, { beforeComponents: componentNames });
    };
}

export function usesComponents<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {
    return function (constructor: T) {
        Object.assign(constructor.prototype, { components: componentNames });
    };
};

export function usesComponentsAfter<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {
    return function (constructor: T) {
        Object.assign(constructor.prototype, { afterComponents: componentNames });
    };
}
