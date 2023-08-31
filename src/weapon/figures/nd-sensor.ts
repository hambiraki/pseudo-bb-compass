import { Coordinates, Length, Angle, type Time } from "@/units";
import { makeCircle, makeLine } from "../utils";
import type { Area } from ".";

// ND索敵センサー系統
class NdSensor implements Area {
  private readonly radius: Length;
  constructor(status: { mRadius: number }) {
    this.radius = Length.byMeter(status.mRadius);
  }
  whole = (position: Coordinates, rotation: Angle): Path2D => {
    return makeLine(position, this.radius, rotation);
  };
  at = (position: Coordinates, rotation: Angle, time: Time): Path2D => {
    return makeLine(position, this.radius, rotation);
  };
  areaToMove = (position: Coordinates, rotation: Angle): Path2D =>
    makeCircle(position, Length.byMeter(20));
  areaToRotate = this.whole;
}

/**
 * @package
 */
export const ndSensor = {
  ND索敵センサー: new NdSensor({ mRadius: 173 }),
  小型ND索敵センサー: new NdSensor({ mRadius: 153 }),
  広域ND索敵センサー: new NdSensor({ mRadius: 286 }),
};
