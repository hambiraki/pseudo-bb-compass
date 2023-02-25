import { Length } from "@/units";

const CENTER_POINT_COLOR = "rgba(255,255,255,1)";
const AREA_COLOR = "rgba(255,0,0,0.3)";

export class WeaponOnMinimap {
    constructor(readonly area:Area){}
    location = new Location(Length.byPixel(0), Length.byPixel(0));
    rotation = new Rotation();
    private get centerPoint():Path2D{
        const centerPoint = new Path2D();
        centerPoint.arc(
            this.location.x.pixel, this.location.y.pixel,
            Length.byMeter(25).pixel,
            0, 2 * Math.PI);        
            return centerPoint;
        };
    readonly isClicked = (
        ctx:CanvasRenderingContext2D, point:Location): boolean =>{
        return ctx.isPointInPath(
            this.area.whole(this.location, this.rotation),
            point.x.pixel, point.y.pixel)
            || ctx.isPointInPath(this.centerPoint, point.x.pixel, point.y.pixel);
    }
    readonly transform = (ctx:CanvasRenderingContext2D, point:Location):void =>{
        if(ctx.isPointInPath(this.centerPoint, point.x.pixel, point.y.pixel)){
            this.location.moveTo(point.x, point.y);
            return;
        }
        if(ctx.isPointInPath(
            this.area.whole(this.location, this.rotation),
            point.x.pixel, point.y.pixel)
        ){
            this.rotation.rotateTo(Math.atan(
                Length.division(
                    Length.subtraction(this.location.x, point.x),
                    Length.subtraction(this.location.y, point.y))
            ))
            return;
        } 
    }
    readonly draw = (ctx: CanvasRenderingContext2D):void => {
        ctx.fillStyle = AREA_COLOR;
        ctx.fill(this.area.whole(this.location, this.rotation));
        ctx.fillStyle = CENTER_POINT_COLOR;
        ctx.fill(this.centerPoint);
    };
    readonly animate = (ctx: CanvasRenderingContext2D, msecTime: number): void => {
        ctx.fillStyle = AREA_COLOR;
        ctx.fill(this.area.at(this.location, this.rotation, msecTime));
        ctx.fillStyle = CENTER_POINT_COLOR;
        ctx.fill(this.centerPoint);
    };
};

export interface Area{
    whole(location:Location, rotation:Rotation):Path2D;
    at(location:Location, rotation:Rotation, msecTime: number): Path2D;        
}

export class Location{
    private _x:Length;
    private _y:Length;
    constructor(x:Length, y:Length){
        this._x = x;
        this._y = y;
    }
    get x():Length{return this._x;}
    get y():Length{return this._y;}
    moveTo = (x:Length, y:Length):void => {
        this._x = x;
        this._y = y;
    }
}

export class Rotation{
    angle = 0;
    rotateTo = (radAngle:number): void =>{
        this.angle = radAngle;
    };
}
