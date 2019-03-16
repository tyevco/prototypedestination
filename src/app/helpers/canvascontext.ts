
export default class CanvasContextHelper {
    private static canvasContext: CanvasRenderingContext2D = null;

    public static get2dContext() {
        if (CanvasContextHelper.canvasContext == null) {
            let canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
            CanvasContextHelper.canvasContext = canvas.getContext("2d");
        }

        return CanvasContextHelper.canvasContext;
    }
}