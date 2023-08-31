import { Coordinates, Length, Angle, Time } from "@/units";
import { makeCircle } from "../utils";
import type { Area } from ".";

// Vセンサー投射器B系統
class VSensorB implements Area {
  private readonly radius: Length;
  private readonly lifetime: Time;
  constructor(status: Record<"mRadius" | "sLifetime", number>) {
    this.radius = Length.byMeter(status.mRadius);
    this.lifetime = new Time(status.sLifetime);
  }
  whole = (position: Coordinates, rotation: Angle): Path2D => {
    return makeCircle(position, this.radius);
  };
  at = (position: Coordinates, rotation: Angle, time: Time): Path2D => {
    if (time.s > this.lifetime.s) return new Path2D();
    return makeCircle(position, this.radius);
  };
  areaToMove = this.whole;
  areaToRotate = (position: Coordinates, rotation: Angle) => new Path2D();
}

/**
 * @package
 */
export const vSensorB = {
  "Vセンサー投射器(B)": new VSensorB({ mRadius: 162, sLifetime: 12 }),
  "小型Vセンサー投射器(B)": new VSensorB({ mRadius: 142, sLifetime: 9 }),
  "広域Vセンサー投射器(B)": new VSensorB({ mRadius: 242, sLifetime: 33 }),
  "H-Vセンサー投射器(B)": new VSensorB({ mRadius: 233, sLifetime: 45 }),
};
