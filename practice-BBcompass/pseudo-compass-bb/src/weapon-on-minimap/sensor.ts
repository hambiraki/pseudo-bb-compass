import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Location, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";


export class SensorFactory implements ModelFactory{
    static readonly modelNames = [
        "索敵センサー",
        "小型索敵センサー",
        "広域索敵センサー",
        "新型索敵センサー",
    ] as const;
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
    constructor(private readonly radius: Length){};
    whole = (location:Location, rotation:Rotation):Path2D => {
        const area = new Path2D();
        area.moveTo( location.x.pixel+this.radius.pixel , location.y.pixel );
        area.arc(
            location.x.pixel,location.y.pixel,
            this.radius.pixel,
            0, 2 * Math.PI);
        return area;
    };
    at = (location:Location, rotation:Rotation, msecTime: number): Path2D =>{
        return this.whole(location,rotation);
    };
}
