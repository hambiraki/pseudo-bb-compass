import { Coordinates, Length, Angle,type Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";

// Vセンサー投射器A系統
class VSensorA implements Area{
    constructor(){};
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

export const vSensorA = {
    "Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:65})),
    "小型Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:55})),
    "広域Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:110})),
    "H-Vセンサー投射器": new WeaponOnMinimap(new VSensorA({mRadius:100})),
};
