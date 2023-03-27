import { Coordinates, Length, Angle,type Time } from "@/units";
import { makeCircle, type Area } from "./utils";
import { WeaponOnMinimap } from ".";

// Vセンサー投射器A系統
class VSensorA implements Area{
    private readonly radius: Length;
    constructor(status:Record<"mRadius",number>){
        this.radius = Length.byMeter(status.mRadius);
    };
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        return makeCircle(location, this.radius);
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        return makeCircle(location, this.radius);
    };
}

/**
 * @package
 */
export const vSensorA = {
    "Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:65})),
    "小型Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:55})),
    "広域Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:110})),
    "H-Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:100})),
};
