import { Coordinates, Length, Angle,type Time, Speed } from "@/units";
import { makeLine, type Area } from "./utils";
import { WeaponOnMinimap } from ".";

// 要請兵器系統
class BoltOnUnit implements Area{
    private readonly radius:Length;
    private readonly speed:Speed;
    private readonly lifetime:Time;
    constructor(status:Record<"mRadius"|"mpsSpeed"|"mDistance",number>){
        this.radius = Length.byMeter(status.mRadius);
        this.speed = new Speed(status.mpsSpeed);
        this.lifetime = this.speed.takeToGo(
            Length.byMeter(status.mDistance));
    };
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        // 基準点と長さ
        const rightWing = Coordinates.byPolar(this.radius,rotation.rightFace);
        const leftWing = Coordinates.byPolar(this.radius,rotation.leftFace);
        const beginCenter = location;
        const vector = Coordinates.byPolar(this.speed.times(this.lifetime),rotation);
        const endCenter = location.plus(vector);
        // 長方形の頂点
        const beginRight = beginCenter.plus(rightWing);
        const beginLeft = beginCenter.plus(leftWing);
        const endRight = endCenter.plus(rightWing);
        const endLeft = endCenter.plus(rightWing);
        // 描画
        const area = new Path2D();
        area.moveTo(beginRight.x.px, beginRight.y.px);
        area.lineTo(beginLeft.x.px, beginLeft.y.px);
        area.lineTo(endLeft.x.px, endLeft.y.px);
        area.lineTo(endRight.x.px, endRight.y.px);
        area.closePath();
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        if(time.s > this.lifetime.s) return new Path2D();
        return makeLine(
            location.plus(Coordinates.byPolar(this.speed.times(time),rotation)),
            this.radius,
            rotation.rightFace
        );
    };
}

/**
 * @package
 */
export const boltOnUnit = {
    "偵察要請装置": new WeaponOnMinimap(new BoltOnUnit({mRadius:500, mpsSpeed:1200, mDistance:1200})),
};
