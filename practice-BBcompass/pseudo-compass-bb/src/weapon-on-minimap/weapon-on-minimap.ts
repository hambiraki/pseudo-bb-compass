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

export abstract class constAnimate {
    abstract draw(ctx: CanvasRenderingContext2D): void;
    animate = (ctx: CanvasRenderingContext2D, time: number): void => {
        this.draw(ctx);
    };
}

export abstract class NonRotatable {
    rotate = (event:DragEvent): void => {};
}

interface LocationOnMinimap {
    x: number;
    y: number;
}
