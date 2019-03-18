import ComponentRegistry from "./componentregistry";
import { Entity } from "./entity";

export abstract class System {
    protected componentRegister: number;
    protected components: Array<Function>;
    protected afterComponentRegister: number;
    protected afterComponents: Array<Function>;
    protected beforeComponentRegister: number;
    protected beforeComponents: Array<Function>;

    public get AfterComponentRegister(): number {
        return this.afterComponentRegister;
    }

    public get AfterComponents(): Array<Function> {
        return this.afterComponents;
    }

    public get ComponentRegister(): number {
        return this.componentRegister;
    }

    public get Components(): Array<Function> {
        return this.components;
    }

    public get BeforeComponentRegister(): number {
        return this.beforeComponentRegister;
    }

    public get BeforeComponents(): Array<Function> {
        return this.beforeComponents;
    }

    public before(): void { /**/ }
    public act(entity: Entity, ...components: Array<any>): void { /**/ }
    public after(): void { /**/ }
}

function calculateComponentsRegister(...componentNames: Array<string | Function>): number {
    let register: number = 0;
    /* tslint:disable:no-bitwise*/
    for (const name of componentNames) {
        let componentName: string;
        if (name instanceof Function) {
            componentName = name.name;
        } else {
            componentName = name;
        }
        const entry: number = ComponentRegistry.registerComponent(componentName);
        register = register | entry;
    }
    /* tslint:enable:no-bitwise*/

    return register;
}

export function usesComponentsBefore<T extends { new(...args: Array<any>): System }>(...components: Array<Function>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            beforeComponentRegister: calculateComponentsRegister(...components),
            beforeComponents: components,
        });
    };
}

export function usesComponents<T extends { new(...args: Array<any>): System }>(...components: Array<Function>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            componentRegister: calculateComponentsRegister(...components),
            components: components,
        });
    };
}

export function usesComponentsAfter<T extends { new(...args: Array<any>): System }>(...components: Array<Function>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            afterComponentRegister: calculateComponentsRegister(...components),
            afterComponents: components,
        });
    };
}
