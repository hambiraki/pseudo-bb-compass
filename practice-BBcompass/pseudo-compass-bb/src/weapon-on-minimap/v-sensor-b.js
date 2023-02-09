import { FILL_STYLE, WeaponOnMinimap } from "./weapon-on-minimap";
class VSensorB extends WeaponOnMinimap {
    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    };
}
