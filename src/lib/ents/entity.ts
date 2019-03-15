import { Component } from "./component";

export class Entity {
    dirty: boolean = false;
    private components: { [name: string]: Component } = {};

    addComponent(c: Component): Entity {
        var componentName = c.Name;

        if (!this.components[componentName]) {
            this.components[componentName] = c;
            this.dirty = true;
        }

        return this;
    }

    getComponent(name: string): Component {
        return this.components[name];
    }

    removeComponent(c: Component): Entity {
        var componentName = c.Name;
        if (!!this.components[componentName]) {
            delete this.components[componentName];
            this.dirty = true;
        }
        return this;
    }

    hasComponent(c: Component): boolean {
        return !!this.components[c.Name];
    }
}