/**
 * 偵察機系統
 */

import { Coordinates, Length, Angle, type Time } from "@/units";
import { makeCircle }  from "./utils";
import type { Area } from ".";
import { Speed } from "@/units";

class Scoutor implements Area{
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
        const area = new Path2D();
        area.arc(
            location.x.px,
            location.y.px,
            this.radius.px,
            rotation.rightFace.radian,
            rotation.leftFace.radian,
        );
        const endAreaCenter = location.plus(
            Coordinates.byPolar(this.speed.times(this.lifetime), rotation)
        );
        area.arc(
            endAreaCenter.x.px,
            endAreaCenter.y.px,
            this.radius.px,
            rotation.rightFace.radian,
            rotation.leftFace.radian,
        );
        area.closePath();
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        if(time.s > this.lifetime.s) return new Path2D();
        return makeCircle(
            location.plus(Coordinates.byPolar(this.speed.times(time),rotation)),
            this.radius
        );
    };
}

/**
 * @package
 */
export const scoutor = {
    "ラーク偵察機": new Scoutor({mRadius:119, mpsSpeed:28, mDistance:250}),
    "ファルコン偵察機": new Scoutor({mRadius:103, mpsSpeed:50, mDistance:500}),
    "ストーク偵察機": new Scoutor({mRadius:113, mpsSpeed:2.6, mDistance:50}),
    "アウル偵察機": new Scoutor({mRadius:142, mpsSpeed:14, mDistance:220}),
    "ロビン偵察機": new Scoutor({mRadius:220, mpsSpeed:20, mDistance:150}),
    "カナリア偵察機": new Scoutor({mRadius:266, mpsSpeed:25, mDistance:80}),
    "マグ": new Scoutor({mRadius:176, mpsSpeed:16, mDistance:180}),
};