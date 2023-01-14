export const FILL_STYLE = "rgba(255,0,0,0.3)"

export abstract class WeaponOnMinimap {
    location: LocationOnMinimap = {
        x: 0,
        y: 0,
    };
    move = (event: DragEvent): void => {
        this.location.x += event.offsetX;
        this.location.y += event.offsetY;
    };
    abstract modelNumber: string;
    abstract rotate(event:DragEvent): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract animate(ctx: CanvasRenderingContext2D, time: number): void;
};

type ClassConstructor<T> = abstract new (...args: any[]) => T;
export function withConstAnimate<C extends ClassConstructor<{
    draw(ctx: CanvasRenderingContext2D): void;
}>>(Class: C){
    abstract class TmpClass extends Class {
        animate = (ctx: CanvasRenderingContext2D, time: number): void => {
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
    x: number;
    y: number;
}
