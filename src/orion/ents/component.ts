import ComponentRegistry from "./componentregistry";

export function component(constructor: Function) {
    Object.assign(constructor.prototype, {
        name: constructor.name,
        register: ComponentRegistry.registerComponent(constructor.name),
    });
}