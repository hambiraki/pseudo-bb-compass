import { Coordinates, Length, Angle,type Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";

// クリアリングソナー系統
class Sonar implements Area{
    constructor(){};
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

export const sonar = {
    "クリアリングソナー": new WeaponOnMinimap(new Sonar({mRadius:184})),
    "クリアリングソナーM": new WeaponOnMinimap(new Sonar({mRadius:174})),
    "クリアリングソナーW": new WeaponOnMinimap(new Sonar({mRadius:242})),
};
