import { Component } from "./component";
import { Entity } from "./entity";

export class System {
    components: Array<string>;
    afterComponents: Array<string>;
    beforeComponents: Array<string>;

    before(): void { };
    act(entity: Entity, ...components: Array<Component>): void { };
    after(): void { };

    step(entities: Array<Entity>): void {
        if (typeof this.components !== "undefined") {
            var length = entities.length;
            for (var i = length - 1; i >= 0; i--) {
                var entity = entities[i];
                var systemArgs: Array<any> = [entity];
                if (this.components.every(function (componentName) {
                    if (entity.hasComponent(componentName)) {
                        systemArgs.push(entity.getComponent(componentName));
                        return true;
                    }
                    return false;
                })) {
                    this.act.apply(this, systemArgs);
                }
            }
        }
    }
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
