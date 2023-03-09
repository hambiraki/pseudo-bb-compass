import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class BalloonFactory implements ModelFactory{
     static readonly modelNames = [
         "滞空索敵弾",
         "小型滞空索敵弾",
         "広域滞空索敵弾",
         "高機能滞空索敵弾",
     ] as const;
     get modelNames():readonly string[] {
         return BalloonFactory.modelNames;
     }
     create = (modelName:typeof BalloonFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "滞空索敵弾":
                 return new WeaponOnMinimap(new Balloon());
             case "小型滞空索敵弾":
                 return new WeaponOnMinimap(new Balloon());
             case "広域滞空索敵弾":
                 return new WeaponOnMinimap(new Balloon());
             case "高機能滞空索敵弾":
                 return new WeaponOnMinimap(new Balloon());
         }
     }
 }
 // 滞空索敵弾系統
 class Balloon implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }