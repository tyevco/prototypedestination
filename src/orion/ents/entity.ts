import ComponentRegistry from "./componentregistry";

export class Entity {
    private dirty: boolean = false;
    private components: Map<string, any> = new Map<string, any>();
    private componentRegister: number = 0;

    public get ComponentRegister(): number {
        return this.componentRegister;
    }

    public addComponent(c: any): Entity {
        const componentName: string = c.name;

        if (!this.hasComponent(componentName)) {
            this.components.set(componentName, c);
            this.dirty = true;
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

    public removeComponent(name: string | any): Entity {
        let componentName: string;
        if (typeof name !== "string") {
            componentName = (name as any).name;
        } else {
            componentName = name;
        }

        if (this.hasComponent(componentName)) {
            this.components.delete(componentName);
            this.dirty = true;
        }
        return this;
    }

    public hasComponent(name: string | any): boolean {
        let componentName: string;
        if (typeof name !== "string") {
            componentName = (name as any).name;
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
