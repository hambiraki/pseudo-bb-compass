import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
export class SensorFactory {
    static modelNames = [
        "索敵センサー",
        "小型索敵センサー",
        "広域索敵センサー",
        "新型索敵センサー",
    ];
    create = (modelName) => {
        switch (modelName) {
            case "索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(70)));
            case "小型索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(65)));
            case "広域索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(125)));
            case "新型索敵センサー":
                return new WeaponOnMinimap(new Sensor(Length.byMeter(88)));
        }
    };
}
// 索敵センサー系統
class Sensor {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    ;
    whole = (location, rotation) => {
        const area = new Path2D();
        area.moveTo(location.x.pixel + this.radius.pixel, location.y.pixel);
        area.arc(location.x.pixel, location.y.pixel, this.radius.pixel, 0, 2 * Math.PI);
        return area;
    };
    at = (location, rotation, msecTime) => {
        return this.whole(location, rotation);
    };
}
