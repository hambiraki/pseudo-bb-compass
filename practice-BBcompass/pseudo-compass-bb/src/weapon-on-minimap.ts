export const FILL_STYLE = "rgba(255,0,0,0.3)"

export interface WeaponOnMinimap {
    locate: LocateOnMinimap;
    radius: number;
    draw(ctx: CanvasRenderingContext2D): void;
    move(event: DragEvent): void;
}

interface LocateOnMinimap {
    locate_x: number;
    locate_y: number;
}

export interface Rotable{
    angle: number;
    rotate(): void;
}

export interface Animatable{
    animate(ctx: CanvasRenderingContext2D, time: number): void;
}