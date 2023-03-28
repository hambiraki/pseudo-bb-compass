import { Coordinates, Length, Angle, Time } from "@/units";
import type { Area } from "./utils";

const CENTER_POINT_COLOR = "rgba(255,255,255,1)";
const AREA_COLOR = "rgba(255,0,0,0.3)";

export class Weapon {
    private location = new Coordinates(Length.byPixel(0), Length.byPixel(0));
    private rotation = Angle.byRadian(0);
    constructor(private readonly area: Area) {}
    private get centerPoint(): Path2D {
        const centerPoint = new Path2D();
        centerPoint.arc(
            this.location.x.px,
            this.location.y.px,
            Length.byMeter(25).px,
            0,
            2 * Math.PI
        );
        return centerPoint;
    }
    readonly isClicked = (
        ctx: CanvasRenderingContext2D,
        point: Coordinates
    ): boolean => {
        return (
            ctx.isPointInPath(
                this.area.whole(this.location, this.rotation),
                point.x.px,
                point.y.px
            ) || ctx.isPointInPath(this.centerPoint, point.x.px, point.y.px)
        );
    };
    readonly transform = (
        ctx: CanvasRenderingContext2D,
        point: Coordinates
    ): void => {
        if (ctx.isPointInPath(this.centerPoint, point.x.px, point.y.px)) {
            this.location = point;
            return;
        }
        if (
            ctx.isPointInPath(
                this.area.whole(this.location, this.rotation),
                point.x.px,
                point.y.px
            )
        ) {
            this.rotation = point.minus(this.location).argument
            return;
        }
    };
    readonly draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.fillStyle = AREA_COLOR;
        ctx.fill(this.area.whole(this.location, this.rotation));
        ctx.fillStyle = CENTER_POINT_COLOR;
        ctx.fill(this.centerPoint);
    };
    readonly animate = (
        ctx: CanvasRenderingContext2D,
        time: Time
    ): void => {
        ctx.fillStyle = AREA_COLOR;
        ctx.fill(this.area.at(this.location, this.rotation, time));
        ctx.fillStyle = CENTER_POINT_COLOR;
        ctx.fill(this.centerPoint);
    };
}
