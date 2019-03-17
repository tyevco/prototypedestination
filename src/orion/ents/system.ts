import { Component } from "./component";
import ComponentRegistry from "./componentregistry";
import { Entity } from "./entity";

export abstract class System {
    protected componentRegister: number = 0;
    protected components: Array<string>;
    protected afterComponentRegister: number = 0;
    protected afterComponents: Array<string>;
    protected beforeComponentRegister: number = 0;
    protected beforeComponents: Array<string>;

    public get AfterComponentRegister(): number {
        return this.afterComponentRegister;
    }

    public get AfterComponents(): Array<string> {
        return this.afterComponents;
    }

    public get ComponentRegister(): number {
        return this.componentRegister;
    }

    public get Components(): Array<string> {
        return this.components;
    }

    public get BeforeComponentRegister(): number {
        return this.beforeComponentRegister;
    }

    public get BeforeComponents(): Array<string> {
        return this.beforeComponents;
    }

    public before(): void { /**/ }
    public act(entity: Entity, ...components: Array<Component>): void { /**/ }
    public after(): void { /**/ }
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

export function usesComponentsBefore<T extends { new(...args: Array<any>): System }>(...componentNames: Array<string>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            beforeComponentRegister: calculateComponentsRegister(...componentNames),
            beforeComponents: componentNames,
        });
    };
}

export function usesComponents<T extends { new(...args: Array<any>): System }>(...componentNames: Array<string>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            componentRegister: calculateComponentsRegister(...componentNames),
            components: componentNames,
        });
    };
}

export function usesComponentsAfter<T extends { new(...args: Array<any>): System }>(...componentNames: Array<string>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            afterComponentRegister: calculateComponentsRegister(...componentNames),
            afterComponents: componentNames,
        });
    };
}
