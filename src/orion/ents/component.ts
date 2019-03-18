import ComponentRegistry from "./componentregistry";

export interface IComponent {
    name: string;
    register: number;
}

export function component<T extends { new(...args: any[]): {} }>(constructor: T) {
    const register: number = ComponentRegistry.registerComponent(constructor.name);
    return class extends constructor implements IComponent {
        public readonly name: string = constructor.name;
        public static readonly register = register;
        public readonly register = register;
    };
}