import { Coordinates, Length, Angle, Time } from "@/units";
import { makeSector, type Area } from "./utils";
import { WeaponOnMinimap } from ".";

// レーダーユニット系統
class Rader implements Area{
    private readonly radius: Length;
    private readonly center: Angle;
    private readonly toFull: Time;
    constructor(status:Record<"mRadius"|"degCenter"|"sToFull",number>){
        this.radius = Length.byMeter(status.mRadius);
        this.center = Angle.byDegree(status.degCenter);
        this.toFull = new Time(status.sToFull);
    };
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        return makeSector(location, this.radius, rotation, this.center);
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        if(time.s <= this.toFull.s){
            const expandingRadius = this.radius.times(time.s / this.toFull.s);
            return makeSector(location, expandingRadius, rotation, this.center);
        }
        return makeSector(location, this.radius, rotation, this.center);
    };
}

/**
 * @package
 */
export const rader = {
    "レーダーユニット": new WeaponOnMinimap(new Rader({mRadius:259, degCenter:60, sToFull:1.67})),
    "レーダーユニットⅡ": new WeaponOnMinimap(new Rader({mRadius:229, degCenter:120, sToFull:1.79})),
    "レーダーユニットⅢ": new WeaponOnMinimap(new Rader({mRadius:209, degCenter:360, sToFull:1.77})),
};
