
import { sealed } from "../lang";
import { Vector2 } from "../spatial";

@sealed
export class MouseDragEvent {
    public static create(event: MouseEvent, start: Vector2, current: Vector2, previous: Vector2): MouseDragEvent {
        return new MouseDragEvent(determineMouseButton(event), start, current, previous);
    }

    public readonly StartPosition: Vector2;
    public readonly Position: Vector2;
    public readonly PreviousPosition: Vector2;

    public readonly Offset: Vector2;
    public readonly PreviousOffset: Vector2;

    public readonly Button: MouseButton;

    private constructor(button: MouseButton, start: Vector2, current: Vector2, lastTriggered: Vector2) {
        this.Offset = start;
        this.Position = current;

        this.Offset = start.vectorTo(current);

        this.Button = button;

        if (lastTriggered != null) {
            this.PreviousPosition = lastTriggered;
            this.PreviousOffset = current.vectorTo(lastTriggered);
        }
    }
}

export enum MouseButton {
    Left,
    Middle,
    Right,
}

function determineMouseButton(event: MouseEvent): MouseButton {
    switch (event.button) {
        case 0:
            return MouseButton.Left;
        case 1:
            return MouseButton.Middle;
        case 2:
            return MouseButton.Right;
    }
}
