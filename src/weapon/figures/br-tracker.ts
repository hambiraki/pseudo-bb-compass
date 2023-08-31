import { Coordinates, Length, Angle, Time } from "@/units";
import { assert } from "@vue/compiler-core";
import { makeCircle, makeSector } from "../utils";
import type { Area } from ".";

// BRトラッカー系統
class BrTracker implements Area {
  private readonly radius: Length;
  private readonly center: Angle;
  private readonly toFull: Time;
  private readonly retention: Time;
  private readonly pause: Time;
  constructor(
    status: Record<
      "mRadius" | "degCenter" | "sToFull" | "sRetention" | "sPause",
      number
    >
  ) {
    this.radius = Length.byMeter(status.mRadius);
    this.center = Angle.byDegree(status.degCenter);
    this.toFull = new Time(status.sToFull);
    this.retention = new Time(status.sRetention);
    this.pause = new Time(status.sPause);
  }
  whole = (position: Coordinates, rotation: Angle): Path2D => {
    return makeSector(position, this.radius, rotation, this.center);
  };
  at = (position: Coordinates, rotation: Angle, time: Time): Path2D => {
    const phase = new Time(
      time.s % (this.toFull.s + this.retention.s + this.pause.s)
    );
    assert(phase.s <= this.toFull.s + this.retention.s + this.pause.s);
    if (phase.s <= this.toFull.s) {
      const expandingRadius = this.radius.times(phase.s / this.toFull.s);
      return makeSector(position, expandingRadius, rotation, this.center);
    }
    if (phase.s <= this.toFull.s + this.retention.s) {
      return makeSector(position, this.radius, rotation, this.center);
    }
    if (phase.s <= this.toFull.s + this.retention.s + this.pause.s) {
      return new Path2D();
    }
    throw new Error();
  };
  areaToMove = (position: Coordinates, rotation: Angle): Path2D =>
    makeCircle(position, Length.byMeter(20));
  areaToRotate = this.whole;
}

/**
 * @package
 */
export const brTracker = {
  BRトラッカー: new BrTracker({
    mRadius: 162,
    degCenter: 90,
    sToFull: 1.65,
    sRetention: 3,
    sPause: 2,
  }),
  集中型BRトラッカー: new BrTracker({
    mRadius: 142,
    degCenter: 120,
    sToFull: 2.05,
    sRetention: 2,
    sPause: 2,
  }),
  広域型BRトラッカー: new BrTracker({
    mRadius: 198,
    degCenter: 150,
    sToFull: 1.67,
    sRetention: 6,
    sPause: 2,
  }),
};
