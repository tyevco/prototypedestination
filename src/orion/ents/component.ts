import ComponentRegistry from "./componentregistry";

export interface IComponent {
    name: string;
    register: number;
}

export function component<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements IComponent {
        public readonly name: string = constructor.name;
        public readonly register = ComponentRegistry.registerComponent(constructor.name);
    };
}