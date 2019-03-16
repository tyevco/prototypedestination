import { Component } from "./component";
import { Entity } from "./entity";

export class System {
    components: Array<string>;

    before() { };
    act(entity: Entity, ...components: Array<Component>) { };
    after() { };

    step(entities: Array<Entity>) {
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

export function usesComponents<T extends { new(...args: any[]): System }>(...componentNames: Array<string>) {

    return function (constructor: Function) {
        Object.assign(constructor.prototype, { components: componentNames });
    };
};