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
    abstract rotate(event:DragEvent): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract animate(ctx: CanvasRenderingContext2D, time: number): void;
};

type ClassConstructor<T> = new (...args: any[]) => T;
export function withConstAnimate<C extends ClassConstructor<{
    draw(ctx: CanvasRenderingContext2D): void;
}>>(Class: C){
    return class extends Class {
        animate = (ctx: CanvasRenderingContext2D, time: number): void => {
            this.draw(ctx);
        };
    }
}
export function NonRotatable<C extends ClassConstructor<{}>>(Class: C){
    return class extends Class {
        rotate = (event:DragEvent): void => {};
    }
}

interface LocationOnMinimap {
    x: number;
    y: number;
}
