import type { MilliSecond, Pixel } from "@/units";

export const FILL_STYLE = "rgba(255,0,0,0.3)"

export abstract class WeaponOnMinimap {
    location: LocationOnMinimap = {
        x: 0 as Pixel,
        y: 0 as Pixel,
    };
    move = (event: DragEvent): void => {
        this.location.x = this.location.x + event.offsetX as Pixel;
        this.location.y = this.location.y + event.offsetY as Pixel;
    };
    abstract rotate(event:DragEvent): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract animate(ctx: CanvasRenderingContext2D, time: MilliSecond): void;
};

type ClassConstructor<T> = abstract new (...args: any[]) => T;
export function withConstAnimate<C extends ClassConstructor<{
    draw(ctx: CanvasRenderingContext2D): void;
}>>(Class: C){
    abstract class TmpClass extends Class {
        animate = (ctx: CanvasRenderingContext2D, time: MilliSecond): void => {
            this.draw(ctx);
        };
    }
    return TmpClass
}
export function NonRotatable<C extends ClassConstructor<{}>>(Class: C){
    abstract class tmpcls extends Class {
        rotate = (event:DragEvent): void => {};
    }
    return tmpcls
}

interface LocationOnMinimap {
    x: Pixel;
    y: Pixel;
}

