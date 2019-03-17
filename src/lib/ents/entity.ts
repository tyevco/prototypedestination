import { Component } from "./component";

export class Entity {
    dirty: boolean = false;
    private components: { [name: string]: Component } = {};

    addComponent(c: Component): Entity {
        var componentName: string = c.Name;

        if (!this.components[componentName]) {
            this.components[componentName] = c;
            this.dirty = true;
        }

        return this;
    }

    getComponent(name: string): Component {
        return this.components[name];
    }

    removeComponent(name: string | Component): Entity {
        let componentName: string;
        if (typeof name !== "string") {
            componentName = (name as Component).Name;
        } else {
            componentName = name;
        }

        if (!!this.components[componentName]) {
            delete this.components[componentName];
            this.dirty = true;
        }
        return this;
    }

    hasComponent(name: string): boolean {
        return !!this.components[name];
    }
}