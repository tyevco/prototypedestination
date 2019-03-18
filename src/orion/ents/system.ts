import ComponentRegistry from "./componentregistry";
import { Entity } from "./entity";

export abstract class System {
    protected componentRegister: number;
    protected components: Array<Function>;
    protected additionalRegisters: Map<string, number>;

    public get ComponentRegister(): number {
        return this.componentRegister;
    }

    public get Components(): Array<Function> {
        return this.components;
    }

    public getRegister(registerName: string): number {
        let register: number = 0;
        if (this.additionalRegisters !== undefined) {
            register = this.additionalRegisters.get(registerName);
        }

        return register;
    }

    public before(entities: Array<Entity>): void { /**/ }
    public act(entity: Entity, ...components: Array<any>): void { /**/ }
    public after(entities: Array<Entity>): void { /**/ }
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

export function usesComponents<T extends { new(...args: Array<any>): System }>(...components: Array<Function>) {
    return (constructor: T) => {
        Object.assign(constructor.prototype, {
            componentRegister: calculateComponentsRegister(...components),
            components: components,
        });
    };
}

export function usesComponentRegister<T extends { new(...args: Array<any>): System }>(registerName: string, ...components: Array<Function>) {
    return (constructor: T) => {
        if (constructor.prototype.additionalRegisters === undefined) {
            constructor.prototype.additionalRegisters = new Map<string, number>();
        }
        constructor.prototype.additionalRegisters.set(registerName, calculateComponentsRegister(...components));
    };
}
