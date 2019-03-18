import { Vector2 } from ".";

export class Bounds {
    public Top: number;
    public Left: number;
    public Width: number;
    public Height: number;

    public contains(position: Vector2): boolean {
        return (this.Left <= position.X && position.X <= this.Left + this.Width)
            && (this.Top <= position.Y && position.Y <= this.Top + this.Height);
    }

    public intersects(other: Bounds) : boolean {
        // NYI
        return false;
    }
}
