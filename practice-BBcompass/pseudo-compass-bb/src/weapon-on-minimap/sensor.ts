import type { Meter } from "@/units";
import { FILL_STYLE, NonRotatable, WeaponOnMinimap, withConstAnimate } from "./weapon-on-minimap";

// 索敵センサー系統
abstract class Sensor extends withConstAnimate(NonRotatable(WeaponOnMinimap)){
    readonly abstract radius: number;
    draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    }
}

// 索敵センサー
// 型番：S2-N
class SensorN extends Sensor{
    radius = 59 as Meter;
}