import { FILL_STYLE, WeaponOnMinimap } from "./weapon-on-minimap";
class Balloon extends WeaponOnMinimap {
    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.location.pxX, this.location.pxY, this.mRadius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    };
}
