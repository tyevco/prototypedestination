
export class Component {

    get Name(): string {
        return (this as any).constructor.name;
    }
}