import { Length } from "@/units";

const CENTER_POINT_COLOR = "rgba(255,255,255,1)";
const AREA_COLOR = "rgba(255,0,0,0.3)";

export class WeaponOnMinimap {
    constructor(readonly figure:Figure){}
    location = new Location(Length.byPixel(0), Length.byPixel(0));
    rotation = new Rotation();
    private get centerPoint():Path2D{
        const centerPoint = new Path2D();
        centerPoint.arc(
            this.location.x.pixel, this.location.y.pixel,
            Length.byMeter(1).pixel,
            0, 2 * Math.PI);        
            return centerPoint;
        };
    readonly isClicked = (
        ctx:CanvasRenderingContext2D, point:Location): boolean =>{
        return ctx.isPointInPath(this.figure.wholeArea, point.x.pixel, point.y.pixel)
            || ctx.isPointInPath(this.centerPoint, point.x.pixel, point.y.pixel);
    }
    readonly transform = (ctx:CanvasRenderingContext2D, point:Location):void =>{
        if(ctx.isPointInPath(this.centerPoint, point.x.pixel, point.y.pixel)){
            this.location.moveTo(point.x, point.y);
        }else if(ctx.isPointInPath(this.figure.wholeArea, point.x.pixel, point.y.pixel)){
            this.rotation.rotateTo(Math.atan(
                this.location.x.difference(this.)
            ))
        }
        
    }
    readonly draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.fillStyle = CENTER_POINT_COLOR;
        ctx.fill(this.centerPoint);
        ctx.fillStyle = AREA_COLOR;
        ctx.fill(this.figure.wholeArea);
    };
    readonly animate = (ctx: CanvasRenderingContext2D, msecTime: number): void => {
        ctx.fillStyle = CENTER_POINT_COLOR;
        ctx.fill(this.centerPoint);
        ctx.fillStyle = AREA_COLOR;
        ctx.fill(this.figure.areaAt(msecTime));
    };
};

export interface Figure{
    get wholeArea():Path2D;
    areaAt(msecTime: number): Path2D;        
}
type ClassConstructor<T> = abstract new (...args: any[]) => T;
export function NotAnimate<C extends ClassConstructor<{
    get wholeArea():Path2D;
}>>(Class: C){
    abstract class NoNameClass extends Class {
        areaAt(msecTime: number): Path2D{
            return this.wholeArea;
        };
    }
    return NoNameClass
}

class Location{
    private _x:Length;
    private _y:Length;
    constructor(x:Length, y:Length){
        this._x = x;
        this._y = y;
    }
    get x():Length{return this.x;}
    get y():Length{return this.y;}
    moveTo = (x:Length, y:Length):void => {
        this._x = x;
        this._y = y;
    }
}

class Rotation{
    angle = 0;
    rotateTo = (radAngle:number): void =>{
        this.angle = radAngle;
    };
}
