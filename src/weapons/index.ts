import { sensor } from "./sensor";
import { scoutor } from "./scoutor";
import { ndSensor } from "./nd-sensor";
import { brTracker } from "./br-tracker";
import { balloon } from "./balloon";
import { vSensorA } from "./v-sensor-a";
import { vSensorB } from "./v-sensor-b";
import { sonar } from "./sonar";
import { rader } from "./rader";
import { boltOnUnit } from "./bolt-on-unit";
import { agitator } from "./agitator";
import { Coordinates, Length, Angle, Time } from "@/units";
import type { Area } from "./utils";

const unverifiedWeapons = {
    "索敵センサー": sensor,
    "ND索敵センサー": ndSensor,
    "BRトラッカー": brTracker,
    "滞空索敵弾":balloon,
    "Vセンサー投射器A":vSensorA,
    "Vセンサー投射器B":vSensorB,
    "偵察機": scoutor,
    "クリアリングソナー":sonar,
    "レーダーユニット":rader,
    "要請兵器":boltOnUnit,
    "FJ－アジテーター":agitator,
}
type raw = typeof unverifiedWeapons;
type Series<T> = T extends any ? Record<keyof T, WeaponOnMinimap> : never;
export const weapons: Record<keyof raw, Series<raw[keyof raw]>> = unverifiedWeapons;

const CENTER_POINT_COLOR = "rgba(255,255,255,1)";
const AREA_COLOR = "rgba(255,0,0,0.3)";

export class WeaponOnMinimap {
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
