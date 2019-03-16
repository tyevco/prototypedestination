
export class CanvasContextHelper {
    private static canvasContext: CanvasRenderingContext2D = null;
    private static canvas: HTMLCanvasElement = null;

    public static get2dContext() {
        if (CanvasContextHelper.canvasContext == null) {
            CanvasContextHelper.canvasContext = CanvasContextHelper.getCanvas().getContext("2d");
        }

        return CanvasContextHelper.canvasContext;
    }

    public static getCanvas() {
        if (CanvasContextHelper.canvas == null) {
            CanvasContextHelper.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        }

        return CanvasContextHelper.canvas;
    }
}