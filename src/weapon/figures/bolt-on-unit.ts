import { Coordinates, Length, Angle, type Time, Speed } from "@/units";
import type { Area } from ".";
import { makeCircle, makeLine } from "../utils";

// 要請兵器系統
class BoltOnUnit implements Area {
  private readonly radius: Length;
  private readonly speed: Speed;
  private readonly lifetime: Time;
  private readonly distanceToStart: Length;
  constructor(
    status: Record<"mRadius" | "mpsSpeed" | "mDistance" | "mToStart", number>
  ) {
    this.radius = Length.byMeter(status.mRadius);
    this.speed = new Speed(status.mpsSpeed);
    this.lifetime = this.speed.takeToGo(Length.byMeter(status.mDistance));
    this.distanceToStart = Length.byMeter(status.mToStart);
  }
  whole = (location: Coordinates, rotation: Angle): Path2D => {
    // 基準点と長さ
    const rightWing = Coordinates.byPolar(this.radius, rotation.rightFace);
    const leftWing = Coordinates.byPolar(this.radius, rotation.leftFace);
    const beginCenter = location.minus(
      Coordinates.byPolar(this.distanceToStart, rotation)
    );
    const endCenter = beginCenter.plus(
      Coordinates.byPolar(this.speed.times(this.lifetime), rotation)
    );
    // 長方形の頂点
    const beginRight = beginCenter.plus(rightWing);
    const beginLeft = beginCenter.plus(leftWing);
    const endRight = endCenter.plus(rightWing);
    const endLeft = endCenter.plus(leftWing);
    // 描画
    const area = new Path2D();
    area.moveTo(beginRight.x.px, beginRight.y.px);
    area.lineTo(beginLeft.x.px, beginLeft.y.px);
    area.lineTo(endLeft.x.px, endLeft.y.px);
    area.lineTo(endRight.x.px, endRight.y.px);
    area.closePath();
    return area;
  };
  at = (location: Coordinates, rotation: Angle, time: Time): Path2D => {
    if (time.s > this.lifetime.s) return new Path2D();
    return makeLine(
      location.plus(Coordinates.byPolar(this.speed.times(time), rotation)),
      this.radius,
      rotation.rightFace
    );
  };
  areaToMove = (location: Coordinates, rotation: Angle): Path2D =>
    makeCircle(location, Length.byMeter(20));
  areaToRotate = this.whole;
}

/**
 * @package
 */
export const boltOnUnit = {
  偵察要請装置: new BoltOnUnit({
    mRadius: 500,
    mpsSpeed: 120,
    mDistance: 1200,
    mToStart: 200,
  }),
};
