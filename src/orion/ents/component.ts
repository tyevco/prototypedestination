import ComponentRegistry from "./componentregistry";

export interface IComponent {
    name: string;
    register: number;
}

export function component<T extends { new(...args: any[]): {} }>(constructor: T) {
    const componentName: string = constructor.name;
    const register: number = ComponentRegistry.registerComponent(componentName);

    Object.assign(constructor.prototype, {
        register: register,
        name: componentName,
    });
}