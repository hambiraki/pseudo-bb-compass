import { Coordinates, Length } from "../units";
import type { Weapon } from "./weapon";

export const detectClickedWeapon = (
  weapons: Weapon[],
  event: PointerEvent,
  context: CanvasRenderingContext2D,
  rect: DOMRect
): ActiveWeapon | null => {
  const point = new Coordinates(
    Length.byPixel(event.clientX - rect.left),
    Length.byPixel(event.clientY - rect.top)
  );
  for (const [index, weapon] of [...weapons].reverse().entries()) {
    if (weapon.isPointToMove(context, point)) {
      return new MovingWeapon(weapons.length - 1 - index, weapon, rect);
    }
    if (weapon.isPointToRotate(context, point)) {
      return new RotatingWeapon(weapons.length - 1 - index, weapon, rect);
    }
  }
  return null;
};

export interface ActiveWeapon {
  readonly index: number;
  readonly weapon: Weapon;
  transform(event: PointerEvent): ActiveWeapon;
}

class MovingWeapon implements ActiveWeapon {
  constructor(
    readonly index: number,
    readonly weapon: Weapon,
    private readonly rect: DOMRect
  ) {}
  transform = (event: PointerEvent): MovingWeapon => {
    const point = new Coordinates(
      Length.byPixel(event.clientX - this.rect.left),
      Length.byPixel(event.clientY - this.rect.top)
    );
    const movedWeapon = this.weapon.move(point);
    return new MovingWeapon(this.index, movedWeapon, this.rect);
  };
}

class RotatingWeapon implements ActiveWeapon {
  constructor(
    readonly index: number,
    readonly weapon: Weapon,
    private readonly rect: DOMRect
  ) {}
  transform = (event: PointerEvent): RotatingWeapon => {
    const point = new Coordinates(
      Length.byPixel(event.clientX - this.rect.left),
      Length.byPixel(event.clientY - this.rect.top)
    );
    const rotatedWeapon = this.weapon.rotate(point);
    return new RotatingWeapon(this.index, rotatedWeapon, this.rect);
  };
}
