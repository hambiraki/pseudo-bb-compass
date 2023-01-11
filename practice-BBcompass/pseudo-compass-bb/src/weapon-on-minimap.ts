export const FILL_STYLE = "rgba(255,0,0,0.3)"

export interface WeaponOnMinimap {
    location: LocationOnMinimap;
    draw(ctx: CanvasRenderingContext2D): void;
};

type ClassConstructor<T> = new (...args: any[]) => T;
export function withMove<C extends ClassConstructor<{
    location: LocationOnMinimap
}>>(Class: C){
    return class extends Class {
        move = (event: DragEvent): void => {
            this.location.x += event.offsetX;
            this.location.y += event.offsetY;
        };
    }
}


abstract class CircleNotMove implements WeaponOnMinimap{
    location: LocationOnMinimap = {x:0, y:0};
    readonly abstract radius: number;
    draw = (ctx: CanvasRenderingContext2D): void => {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = FILL_STYLE;
        ctx.fill();
    }
}
const Circle = withMove(CircleNotMove);

export interface Sector extends Rotable{
    readonly radius: number;
    readonly centralAngle: number;
}

export interface Animatable{
    animate(ctx: CanvasRenderingContext2D, time: number): void;
}

interface LocationOnMinimap {
    x: number;
    y: number;
}

interface Rotable{
    rotationAngle: number;
    rotate(): void;
}
