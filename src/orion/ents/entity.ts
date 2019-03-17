import { Component } from "./component";
import ComponentRegistry from "./ComponentRegistry";

export class Entity {
    private dirty: boolean = false;
    private components: Map<string, Component> = new Map<string, Component>();
    private componentRegister: number = 0;

    public addComponent(c: Component): Entity {
        const componentName: string = c.Name;

        if (!this.hasComponent(componentName)) {
            this.components.set(componentName, c);
            this.dirty = true;
        }

        return this;
    }

    public getComponent(name: string): Component {
        return this.components.get(name);
    }

    public removeComponent(name: string | Component): Entity {
        let componentName: string;
        if (typeof name !== "string") {
            componentName = (name as Component).Name;
        } else {
            componentName = name;
        }

        if (this.hasComponent(componentName)) {
            this.components.delete(componentName);
            this.dirty = true;
        }
        return this;
    }

    public hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    public isDirty(): boolean {
        return this.dirty;
    }

    public updateRegistry(): void {
        let register: number = 0;
        /* tslint:disable:no-bitwise*/
        for (const component of this.components) {
            const entry = ComponentRegistry.registerComponent(component[0]);
            register = register | entry;
        }
        /* tslint:enable:no-bitwise*/

        this.componentRegister = register;
    }
}