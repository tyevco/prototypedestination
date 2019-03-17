
interface IMouseEventEmitter {
    addEventListener<K extends keyof IMouseEventMap>(
        type: K, listener: (this: IMouseEventEmitter, ev: IMouseEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions): void;

    addEventListener(
        type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

    removeEventListener<K extends keyof IMouseEventMap>(
        type: K, listener: (this: IMouseEventEmitter, ev: IMouseEventMap[K]) => any,
        options?: boolean | EventListenerOptions): void;

    removeEventListener(
        type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
