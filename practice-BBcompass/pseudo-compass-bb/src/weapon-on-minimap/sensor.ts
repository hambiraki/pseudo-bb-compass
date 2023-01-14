import { FILL_STYLE, NonRotatable, WeaponOnMinimap, withConstAnimate } from "./weapon-on-minimap";

abstract class Sensor extends withConstAnimate(NonRotatable(WeaponOnMinimap)){
    readonly abstract radius: number;
    draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    }
}

class SensorN extends Sensor{
    modelNumber = "S2-N";
    radius = 59;
}