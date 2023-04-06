import { Coordinates, Length } from "../units";
import type { Weapon } from "./weapon";

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
        const clickingWeapon = weapon.transform(context, point);
        if (clickingWeapon !== null){
          return new WeaponOnMinimap(weapon,context,rect);
        }
      }
      return null;
    }
    transform = (event: MouseEvent): WeaponOnMinimap | null => {
        const point = new Coordinates(
          Length.byPixel(event.clientX - this.rect.left),
          Length.byPixel(event.clientY - this.rect.top)
        );
        const transformedWeapon = this.weapon.transform(this.context, point);
        if(transformedWeapon === null) return null;
        return new WeaponOnMinimap(
          transformedWeapon, this.context, this.rect
        )
    }
}