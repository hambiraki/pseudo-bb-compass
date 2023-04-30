import { Length, Coordinates, Angle } from "@/units";

/**
 * @package
 */
export const makeCircle = (center: Coordinates, radius: Length): Path2D => {
  const area = new Path2D();
  area.moveTo(center.x.plus(radius).px, center.y.px);
  area.arc(center.x.px, center.y.px, radius.px, 0, 2 * Math.PI);
  return area;
};

/**
 * @package
 */
export const makeLine = (
  center: Coordinates,
  radius: Length,
  rotation: Angle
): Path2D => {
  const area = new Path2D();
  const beginPoint = center.minus(Coordinates.byPolar(radius, rotation));
  area.moveTo(beginPoint.x.px, beginPoint.y.px);
  const endPoint = center.plus(Coordinates.byPolar(radius, rotation));
  area.lineTo(endPoint.x.px, endPoint.y.px);
  return area;
};

/**
 * @package
 */
export const makeSector = (
  centerPoint: Coordinates,
  radius: Length,
  rotation: Angle,
  centralAngle: Angle
): Path2D => {
  const area = new Path2D();
  area.moveTo(centerPoint.x.px, centerPoint.y.px);
  area.arc(
    centerPoint.x.px,
    centerPoint.y.px,
    radius.px,
    rotation.plus(centralAngle.times(-0.5)).radian,
    rotation.plus(centralAngle.times(0.5)).radian
  );
  area.closePath();
  return area;
};
