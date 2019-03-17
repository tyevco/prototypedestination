import { Component } from "./component";
import ComponentRegistry from "./componentregistry";
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

function calculateComponentsRegister(...componentNames: Array<string>): number {
    let register: number = 0;
    /* tslint:disable:no-bitwise*/
    for (const name of componentNames) {
        const entry: number = ComponentRegistry.registerComponent(name);
        register = register | entry;
    }
    /* tslint:enable:no-bitwise*/

    return register;
}

export function usesComponentsBefore<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            beforeComponentRegister: calculateComponentsRegister(...componentNames),
            beforeComponents: componentNames,
        });
    };
}

export function usesComponents<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {


    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            componentRegister: calculateComponentsRegister(...componentNames),
            components: componentNames,
        });
    };
};

export function usesComponentsAfter<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            afterComponentRegister: calculateComponentsRegister(...componentNames),
            afterComponents: componentNames,
        });
    };
}
