
export interface IKeyboardHandler {
    onKeyDown(event: KeyboardEvent): void;
    onKeyUp(event: KeyboardEvent): void;
    onKeyPress(event: KeyboardEvent): void;
}
