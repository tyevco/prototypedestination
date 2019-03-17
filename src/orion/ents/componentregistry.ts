class ComponentRegistry {

    public static Instance: ComponentRegistry = new ComponentRegistry();

    private components: { [name: string]: number } = {};
    private componentCount: number = 0;

    public registerComponent(componentName: string): number {
        if (this.components.length >= 64) {
            throw new Error("Too many components have been registered! Currently Orion only supports 64 components.");
        }

        let componentBit: number = 0;
        if (!this.components[componentName]) {
            this.components[componentName] = Math.pow(2, this.componentCount++);
        } else {
            componentBit = this.components[componentName];
        }

        return componentBit;
    }

    public getComponentBit(componentName: string): number {
        let componentBit: number = 0;
        if (this.components[componentName]) {
            componentBit = this.components[componentName];
        }

        return componentBit;
    }
}

export default ComponentRegistry.Instance;
