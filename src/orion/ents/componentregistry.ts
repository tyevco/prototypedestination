class ComponentRegistry {

    public static Instance: ComponentRegistry = new ComponentRegistry();
    private components: Map<string, number> = new Map<string, number>();

    public registerComponent(componentName: string): number {
        if (this.components.size >= 64) {
            throw new Error("Too many components have been registered! Currently Orion only supports 64 components.");
        }

        let componentBit: number = 0;
        if (!this.components.has(componentName)) {
            componentBit = Math.pow(2, this.components.size);
            this.components.set(componentName, componentBit);
        } else {
            componentBit = this.components.get(componentName);
        }

        return componentBit;
    }

    public getComponentBit(componentName: string): number {
        let componentBit: number = 0;
        if (this.components.has(componentName)) {
            componentBit = this.components.get(componentName);
        }

        return componentBit;
    }
}

export default ComponentRegistry.Instance;
