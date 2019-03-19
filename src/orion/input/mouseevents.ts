
import { sealed } from "../lang";
import { Vector2 } from "../spatial";

abstract class AbstractMouseEvent {
    public readonly Position: Vector2;
    public readonly Button: MouseButton;

    constructor(event: MouseEvent, position: Vector2) {
        this.Button = determineMouseButton(event);
        this.Position = position;
    }
}

@sealed
export class MouseClickEvent extends AbstractMouseEvent {
    public static create(event: MouseEvent, current: Vector2): MouseClickEvent {
        return new MouseClickEvent(event, current);
    }

    private constructor(event: MouseEvent, current: Vector2) {
        super(event, current);
    }
}

@sealed
export class MouseDownEvent extends AbstractMouseEvent {
    public static create(event: MouseEvent, current: Vector2): MouseDownEvent {
        return new MouseDownEvent(event, current);
    }

    private constructor(event: MouseEvent, current: Vector2) {
        super(event, current);
    }
}

@sealed
export class MouseUpEvent extends AbstractMouseEvent {
    public static create(event: MouseEvent, current: Vector2): MouseUpEvent {
        return new MouseUpEvent(event, current);
    }

    private constructor(event: MouseEvent, current: Vector2) {
        super(event, current);
    }
}

@sealed
export class MouseDragEvent extends AbstractMouseEvent {
    public static create(event: MouseEvent, start: Vector2, current: Vector2, previous: Vector2): MouseDragEvent {
        return new MouseDragEvent(event, start, current, previous);
    }

    public readonly StartPosition: Vector2;
    public readonly PreviousPosition: Vector2;

    public readonly Offset: Vector2;
    public readonly PreviousOffset: Vector2;

    private constructor(event: MouseEvent, start: Vector2, current: Vector2, lastTriggered: Vector2) {
        super(event, current);
        this.StartPosition = start;

        this.Offset = start.vectorTo(current);

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
