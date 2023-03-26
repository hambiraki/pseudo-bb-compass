import { Coordinates, Length, Angle,type Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";

// Vセンサー投射器B系統
class VSensorB implements Area{
    constructor(){};
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

export const vSensorB = {
    "Vセンサー投射器": new WeaponOnMinimap(new VSensorB({mRadius:162, sLifetime:12})),
    "小型Vセンサー投射器": new WeaponOnMinimap(new VSensorB({mRadius:142, sLifetime:9})),
    "広域Vセンサー投射器": new WeaponOnMinimap(new VSensorB({mRadius:242, sLifetime:33})),
    "H-Vセンサー投射器": new WeaponOnMinimap(new VSensorB({mRadius:233, sLifetime:45})),
};
