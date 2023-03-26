import { Coordinates, Length, Angle,type Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";

// レーダーユニット系統
class Rader implements Area{
    constructor(){};
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

export const rader = {
    "レーダーユニット": new WeaponOnMinimap(new Rader({mRadius:259, degCenter:60, sToFull:1.67})),
    "レーダーユニットⅡ": new WeaponOnMinimap(new Rader({mRadius:229, degCenter:120, sToFull:1.79})),
    "レーダーユニットⅢ": new WeaponOnMinimap(new Rader({mRadius:209, degCenter:360, sToFull:1.77})),
};
