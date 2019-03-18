import { Component } from "./component";
import ComponentRegistry from "./componentregistry";

export class Entity {
    private dirty: boolean = false;
    private components: Map<string, Component> = new Map<string, Component>();
    private componentRegister: number = 0;

    public get ComponentRegister(): number {
        return this.componentRegister;
    }

    public addComponent(c: Component): Entity {
        const componentName: string = c.name;

        if (!this.hasComponent(componentName)) {
            this.components.set(componentName, c);
            this.dirty = true;
        }

        return this;
    }

    public getComponent(component: Function): Component {
        return this.components.get(component.name);
    }

    public getComponents(...components: Array<Function>): Array<Component> {
        const componentList: Array<Component> = new Array<Component>();

        for (const component of components) {
            componentList.push(this.getComponent(component));
        }

        return componentList;
    }

    public removeComponent(name: string | Component): Entity {
        let componentName: string;
        if (typeof name !== "string") {
            componentName = (name as Component).name;
        } else {
            componentName = name;
        }

        if (this.hasComponent(componentName)) {
            this.components.delete(componentName);
            this.dirty = true;
        }
        return this;
    }

    public hasComponent(name: string | Function): boolean {
        let componentName: string;
        if (typeof name !== "string") {
            componentName = (name as Component).name;
        } else {
            componentName = name;
        }
        return this.components.has(componentName);
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

        this.dirty = false;
    }
}
