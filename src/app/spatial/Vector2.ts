import { ICloneable } from "../../lib/lang";

export class Vector2 implements ICloneable<Vector2> {
    private x: number = 0;

    private y: number = 0;

    private static zero: Vector2 = new Vector2(0, 0);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get X(): number {
        return this.x;
    }

    public set X(value: number) {
        this.x = value;
    }

    public get Y(): number {
        return this.y;
    }

    public set Y(value: number) {
        this.y = value;
    }

    public static get Zero(): Vector2 {
        return Vector2.zero.clone();
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}