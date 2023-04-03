import type { Weapon } from "./weapons/weapon";
import { Coordinates, Length } from "./units";

export class WeaponOnMinimap{
    private constructor(
        private readonly weapon: Weapon,
        private readonly context: CanvasRenderingContext2D,
        private readonly rect: DOMRect,
    ){}
    static detectClickedWeapon = (
      weapons: Weapon[],
      event: MouseEvent,
      context: CanvasRenderingContext2D,
      rect: DOMRect
    ): WeaponOnMinimap | null => {
      const point = new Coordinates(
        Length.byPixel(event.clientX - rect.left),
        Length.byPixel(event.clientY - rect.top)
      );
      for (const weapon of [...weapons].reverse()) {
        if (weapon.isClicked(context, point)){
          return new WeaponOnMinimap(weapon,context,rect);
        }
      }
      return null;
    }
    transform = (event: MouseEvent):void => {
        const point = new Coordinates(
          Length.byPixel(event.clientX - this.rect.left),
          Length.byPixel(event.clientY - this.rect.top)
        );
        this.weapon.transform(this.context, point);
    }
}