/**
 * 索敵センサー系統
 */
import { Coordinates, Length, Angle, type Time } from "@/units";
import { makeCircle } from "../utils";
import type { Area } from ".";

class Sensor implements Area {
  private readonly radius: Length;
  constructor(status: Record<"mRadius", number>) {
    this.radius = Length.byMeter(status.mRadius);
  }
  whole = (location: Coordinates, rotation: Angle): Path2D => {
    return makeCircle(location, this.radius);
  };
  at = (location: Coordinates, rotation: Angle, time: Time): Path2D => {
    return makeCircle(location, this.radius);
  };
  areaToMove = this.whole;
  areaToRotate = (location: Coordinates, rotation: Angle) => new Path2D();
}

/**
 * @package
 */
export const sensor = {
  索敵センサー: new Sensor({ mRadius: 70 }),
  小型索敵センサー: new Sensor({ mRadius: 65 }),
  広域索敵センサー: new Sensor({ mRadius: 125 }),
  新型索敵センサー: new Sensor({ mRadius: 88 }),
};
