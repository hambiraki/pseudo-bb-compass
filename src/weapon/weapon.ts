import { Coordinates, Length, Angle, Time } from "@/units";
import type { Area } from "./figures";

const CENTER_POINT_COLOR = "rgba(255,255,255,1)";
const AREA_COLOR = "rgba(255,0,0,0.3)";

export class Weapon {
  constructor(
    private readonly area: Area,
    private readonly location: Coordinates,
    private readonly rotation: Angle
  ) {}
  private get centerPoint(): Path2D {
    const centerPoint = new Path2D();
    centerPoint.arc(
      this.location.x.px,
      this.location.y.px,
      Length.byMeter(5).px,
      0,
      2 * Math.PI
    );
    return centerPoint;
  }
  readonly isPointToMove = (
    ctx: CanvasRenderingContext2D,
    point: Coordinates
  ): boolean => {
    return ctx.isPointInPath(this.centerPoint, point.x.px, point.y.px);
  };
  readonly isPointToRotate = (
    ctx: CanvasRenderingContext2D,
    point: Coordinates
  ): boolean => {
    if (this.isPointToMove(ctx, point)) return false;
    return ctx.isPointInPath(
      this.area.whole(this.location, this.rotation),
      point.x.px,
      point.y.px
    );
  };
  readonly move = (point: Coordinates): Weapon => {
    return new Weapon(this.area, point, this.rotation);
  };
  readonly rotate = (point: Coordinates): Weapon => {
    const newRotation = point.minus(this.location).argument;
    return new Weapon(this.area, this.location, newRotation);
  };
  readonly draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = AREA_COLOR;
    ctx.fill(this.area.whole(this.location, this.rotation));
    ctx.fillStyle = CENTER_POINT_COLOR;
    ctx.fill(this.centerPoint);
  };
  readonly animate = (ctx: CanvasRenderingContext2D, time: Time): void => {
    ctx.fillStyle = AREA_COLOR;
    ctx.fill(this.area.at(this.location, this.rotation, time));
    ctx.fillStyle = CENTER_POINT_COLOR;
    ctx.fill(this.centerPoint);
  };
}
