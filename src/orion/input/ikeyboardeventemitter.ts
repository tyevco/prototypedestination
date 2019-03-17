
interface IKeyboardEventEmitter {
    addEventListener<K extends keyof IKeyboardEventMap>(
        type: K, listener: (this: IKeyboardEventEmitter, ev: IKeyboardEventMap[K]) => any,
        soptions?: boolean | AddEventListenerOptions): void;

    addEventListener(
        type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

    removeEventListener<K extends keyof IKeyboardEventMap>(
        type: K, listener: (this: IKeyboardEventEmitter, ev: IKeyboardEventMap[K]) => any,
        options?: boolean | EventListenerOptions): void;

    removeEventListener(
        type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
