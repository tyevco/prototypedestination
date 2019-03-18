
export class Component {
    public get name(): string {
        return (this as any).constructor.name;
    }
}
