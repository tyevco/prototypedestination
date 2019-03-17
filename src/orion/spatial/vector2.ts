import { ICloneable } from "../../orion/lang";

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

    public vectorTo(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    public distanceTo(other: Vector2): number {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
    }

    public length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public normal(): Vector2 {
        let dist: number = this.length();
        return new Vector2(this.x / dist, this.y / dist);
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}