
export class CanvasContextHelper {
    public static get2dContext(): CanvasRenderingContext2D {
        if (CanvasContextHelper.canvasContext == null) {
            CanvasContextHelper.canvasContext = CanvasContextHelper.getCanvas().getContext("2d");
        }

        return CanvasContextHelper.canvasContext;
    }

    public static getCanvas(): HTMLCanvasElement {
        if (CanvasContextHelper.canvas == null) {
            CanvasContextHelper.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        }

        return CanvasContextHelper.canvas;
    }

    private static canvasContext: CanvasRenderingContext2D = null;
    private static canvas: HTMLCanvasElement = null;
}
