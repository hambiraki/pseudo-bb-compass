import { FILL_STYLE, WeaponOnMinimap, NotAnimate } from "./weapon-on-minimap";

// 索敵センサー系統
abstract class Sensor extends NotAnimate(WeaponOnMinimap){
    readonly abstract mRadius: number;
    draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.beginPath();
        ctx.arc(0,0, this.mRadius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    }
}

// 索敵センサー
// 型番：S2-N
class SensorN extends Sensor{
    mRadius = 59;
}