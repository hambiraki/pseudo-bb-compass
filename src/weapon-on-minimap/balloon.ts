import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Location, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";

/**
 * @package
 */
export class BallonFactory implements ModelFactory{
    static readonly modelNames = [
        "滞空索敵弾",
        "小型滞空索敵弾",
        "広域滞空索敵弾",
        "高機能滞空索敵弾",
    ] as const;
    get modelNames():readonly string[] {
        return BallonFactory.modelNames;
    }
    create = (modelName:typeof BallonFactory.modelNames[number]):WeaponOnMinimap => {
        switch(modelName){
            case "滞空索敵弾":
                return new WeaponOnMinimap(new Balloon(Length.byMeter(76)));
            case "小型滞空索敵弾":
                return new WeaponOnMinimap(new Balloon(Length.byMeter(65)));
            case "広域滞空索敵弾":
                return new WeaponOnMinimap(new Balloon(Length.byMeter(98)));
            case "高機能滞空索敵弾":
                return new WeaponOnMinimap(new Balloon(Length.byMeter(138)));
        }
    }
}

// 滞空索敵弾系統
class Balloon implements Area{
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
