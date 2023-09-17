import { Coordinates, Length, Angle, Time } from "@/units";
import { isWeaponModelName, type Area, model2weapon } from "./figures";
import { makeCircle } from "./utils";
import { parseQuery, type LocationQueryValue } from "vue-router";

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

  readonly toString = (): string =>
    `(name=${this.name},x=${this.position.x.m},y=${this.position.y.m},deg=${this.rotation.degree})`;

  static readonly fromString = (
    weaponQuery: LocationQueryValue
  ): Weapon | null => {
    if (weaponQuery === null) return null;
    const parsedParams = parseQuery(
      weaponQuery.slice(1, -1).split(",").join("&")
    ); // 前後に()つけるのでslice(1, -1)
    if (!isWeaponModelName(parsedParams.name)) return null;
    if (Number.isNaN(parsedParams.x)) return null;
    if (Number.isNaN(parsedParams.y)) return null;
    const degree = Number.isNaN(parsedParams.deg)
      ? 0
      : Number(parsedParams.deg);
    return new Weapon(
      parsedParams.name,
      model2weapon[parsedParams.name],
      new Coordinates(
        Length.byMeter(Number(parsedParams.x)),
        Length.byMeter(Number(parsedParams.y))
      ),
      Angle.byDegree(degree)
    );
  };
}
