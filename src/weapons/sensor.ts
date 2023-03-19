import { makeCircle } from "./figures";
import { Coordinates, Length, Angle,type Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";

/**
 * @package
 */
export class SensorFactory implements ModelFactory{
    static readonly modelNames = [
        "索敵センサー",
        "小型索敵センサー",
        "広域索敵センサー",
        "新型索敵センサー",
    ] as const;
    get modelNames():readonly string[] {
        return SensorFactory.modelNames;
    }
    create = (modelName:typeof SensorFactory.modelNames[number]):WeaponOnMinimap => {
        switch(modelName){
            case "索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(70)));
            case "小型索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(65)));
            case "広域索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(125)));
            case "新型索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(88)));
        }
    }
}

// 索敵センサー系統
class Sensor implements Area{
    constructor(
        private readonly radius: Length
    ){};
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        return makeCircle(location,this.radius)
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        return this.whole(location,rotation);
    };
}
