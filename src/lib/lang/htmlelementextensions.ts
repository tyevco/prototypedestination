import { MouseHandler } from "./mousehandler";

// interface HTMLElementConstructor {
//     addMouseHandlers(handler: MouseHandler, bubbleEvents: boolean): void;
// }

// HTMLElement.prototype.addMouseHandlers = function (handler: MouseHandler, bubbleEvents: boolean = false): void {

//     this.addEventListener("mousedown", (e: MouseEvent) => handler.onMouseDown(e), bubbleEvents);
//     this.addEventListener("mouseup", (e: MouseEvent) => handler.onMouseUp(e), bubbleEvents);
//     this.addEventListener("mousemove", (e: MouseEvent) => handler.onMouseMove(e), bubbleEvents);
//     this.addEventListener("mouseenter", (e: MouseEvent) => handler.onMouseEnter(e), bubbleEvents);
//     this.addEventListener("mouseleave", (e: MouseEvent) => handler.onMouseLeave(e), bubbleEvents);
// }