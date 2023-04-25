import { Coordinates, Length } from "../units";
import type { Weapon } from "./weapon";

export class UpdatingWeapons {
  private constructor(
    readonly weapons: Weapon[],
    private readonly activeWeapon: Weapon,
    private readonly transform: (weapon: Weapon, point: Coordinates) => Weapon,
    private readonly rect: DOMRect
  ) {}
  readonly update = (event: MouseEvent): UpdatingWeapons => {
    const activeIndex = this.weapons.indexOf(this.activeWeapon);
    const point = new Coordinates(
      Length.byPixel(event.clientX - this.rect.left),
      Length.byPixel(event.clientY - this.rect.top)
    );
    this.weapons[activeIndex] = this.transform(this.activeWeapon, point);
    return { ...this };
  };
  static detectClickedWeapon = (
    weapons: Weapon[],
    event: MouseEvent,
    context: CanvasRenderingContext2D,
    rect: DOMRect
  ): UpdatingWeapons | null => {
    const point = new Coordinates(
      Length.byPixel(event.clientX - rect.left),
      Length.byPixel(event.clientY - rect.top)
    );
    for (const weapon of [...weapons].reverse()) {
      if (weapon.isPointToMove(context, point)) {
        const transform = (w: Weapon, point: Coordinates) => w.move(point);
        return new UpdatingWeapons(weapons, weapon, transform, rect);
      }
      if (weapon.isPointToRotate(context, point)) {
        const transform = (w: Weapon, point: Coordinates) => w.rotate(point);
        return new UpdatingWeapons(weapons, weapon, transform, rect);
      }
    }
    return null;
  };
}
