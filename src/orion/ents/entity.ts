import ComponentRegistry from "./componentregistry";

export class Entity {
    public static create(...components: Array<any>): Entity {
        return new Entity()
            .addComponents(...components)
            .updateRegistry();
    }

    private static idCounter: number = 0;

    private constructor() {
        this.id = Entity.idCounter++;
    }

    public readonly id: number;
    private dirty: boolean = false;
    private components: Map<string, any> = new Map<string, any>();
    private componentRegister: number = 0;

    public get ComponentRegister(): number {
        return this.componentRegister;
    }

    public addComponent(component: any): Entity {
        const componentName: string = component.name;

        if (!this.hasComponent(componentName)) {
            this.components.set(componentName, component);
            this.dirty = true;
        }

        return this;
    }

    private addComponents(...components: Array<any>): Entity {
        for (const component of components) {
            this.addComponent(component);
        }

        return this;
    }

    public getComponent(component: Function): any {
        return this.components.get(component.name);
    }

    public getComponents(...components: Array<Function>): Array<any> {
        const componentList: Array<any> = new Array<any>();

        for (const component of components) {
            componentList.push(this.getComponent(component));
        }

        return componentList;
    }

    public removeComponent(component: string | any): Entity {
        let componentName: string;
        if (typeof component !== "string") {
            componentName = (component as any).name;
        } else {
            componentName = component;
        }

        if (this.hasComponent(componentName)) {
            this.components.delete(componentName);
            this.dirty = true;
        }
        return this;
    }

    public hasComponent(component: string | any): boolean {
        let componentName: string;
        if (typeof component !== "string") {
            componentName = (component as any).name;
        } else {
            componentName = component;
        }
        return this.components.has(componentName);
    }

    public isDirty(): boolean {
        return this.dirty;
    }

    public updateRegistry(): Entity {
        let register: number = 0;
        /* tslint:disable:no-bitwise*/
        for (const component of this.components) {
            const entry = ComponentRegistry.registerComponent(component[0]);
            register = register | entry;
        }
        /* tslint:enable:no-bitwise*/

        this.componentRegister = register;

        this.dirty = false;

        return this;
    }

    public match(register: number): boolean {
        /* tslint:disable:no-bitwise*/
        return (register & this.ComponentRegister) === register;
        /* tslint:enable:no-bitwise*/
    }
}
