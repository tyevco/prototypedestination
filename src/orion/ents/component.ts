
export class Component {
    public static get Name(): string {
        return this.toString().split("(" || /s+/)[0].split(" " || /s+/)[1];
    }

    public get Name(): string {
        return (this as any).constructor.name;
    }
}
