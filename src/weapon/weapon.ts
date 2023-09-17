import { Coordinates, Length, Angle, Time } from "@/units";
import type { Area } from "./figures";
import { makeCircle } from "./utils";

const CENTER_POINT_COLOR = "rgba(255,255,255,1)";
const AREA_COLOR = "rgba(255,0,0,0.3)";

export class Weapon {
  constructor(
    private readonly name: string, //クエリパラメータ用なので型緩め
    private readonly area: Area,
    private readonly position: Coordinates,
    private readonly rotation: Angle
  ) {}
  private get centerPoint(): Path2D {
    return makeCircle(this.position, Length.byMeter(5));
  }
  readonly isPointToMove = (
    ctx: CanvasRenderingContext2D,
    point: Coordinates
  ): boolean => {
    return ctx.isPointInPath(
      this.area.areaToMove(this.position, this.rotation),
      point.x.px,
      point.y.px
    );
  };
  readonly isPointToRotate = (
    ctx: CanvasRenderingContext2D,
    point: Coordinates
  ): boolean => {
    if (this.isPointToMove(ctx, point)) return false;
    return ctx.isPointInPath(
      this.area.areaToRotate(this.position, this.rotation),
      point.x.px,
      point.y.px
    );
  };
  readonly move = (point: Coordinates): Weapon => {
    return new Weapon(this.name, this.area, point, this.rotation);
  };
  readonly rotate = (point: Coordinates): Weapon => {
    const newRotation = point.minus(this.position).argument;
    return new Weapon(this.name, this.area, this.position, newRotation);
  };
  readonly draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = AREA_COLOR;
    ctx.fill(this.area.whole(this.position, this.rotation));
    ctx.fillStyle = CENTER_POINT_COLOR;
    ctx.fill(this.centerPoint);
  };
  readonly animate = (ctx: CanvasRenderingContext2D, time: Time): void => {
    ctx.fillStyle = AREA_COLOR;
    ctx.fill(this.area.at(this.position, this.rotation, time));
    ctx.fillStyle = CENTER_POINT_COLOR;
    ctx.fill(this.centerPoint);
  };
}
