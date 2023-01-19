import { FILL_STYLE, WeaponOnMinimap } from "./weapon-on-minimap";

abstract class Balloon extends WeaponOnMinimap{
    readonly abstract mRadius: number;
    draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.beginPath();
        ctx.arc(this.location.pxX, this.location.pxY, this.mRadius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    }
}