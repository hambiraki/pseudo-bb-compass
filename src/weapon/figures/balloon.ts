import { Coordinates, Length, Angle, Time } from "@/units";
import { makeCircle } from "../utils";
import type { Area } from ".";

// 滞空索敵弾系統
class Balloon implements Area {
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
    return this.whole(position, rotation);
  };
  areaToMove = this.whole;
  areaToRotate = (position: Coordinates, rotation: Angle) => new Path2D();
}

/**
 * @package
 */
export const balloon = {
  滞空索敵弾: new Balloon({ mRadius: 76, sLifetime: 50 }),
  小型滞空索敵弾: new Balloon({ mRadius: 65, sLifetime: 60 }),
  広域滞空索敵弾: new Balloon({ mRadius: 98, sLifetime: 65 }),
  高機能滞空索敵弾: new Balloon({ mRadius: 138, sLifetime: 85 }),
};
