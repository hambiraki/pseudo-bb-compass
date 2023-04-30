import { Coordinates, Length, Angle, type Time } from "@/units";
import { makeCircle } from "../utils";
import type { Area } from ".";

// クリアリングソナー系統
class Sonar implements Area {
  private readonly radius: Length;
  constructor(status: Record<"mRadius", number>) {
    this.radius = Length.byMeter(status.mRadius);
  }
  whole = (location: Coordinates, rotation: Angle): Path2D => {
    return makeCircle(location, this.radius);
  };
  at = (location: Coordinates, rotation: Angle, time: Time): Path2D => {
    return new Path2D();
  };
  areaToMove = this.whole;
  areaToRotate = (location: Coordinates, rotation: Angle) => new Path2D();
}

/**
 * @package
 */
export const sonar = {
  クリアリングソナー: new Sonar({ mRadius: 184 }),
  クリアリングソナーM: new Sonar({ mRadius: 174 }),
  クリアリングソナーW: new Sonar({ mRadius: 242 }),
};
