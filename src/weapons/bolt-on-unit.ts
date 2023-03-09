import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class BoltOnUnitFactory implements ModelFactory{
     static readonly modelNames = [
         "偵察要請装置",
     ] as const;
     get modelNames():readonly string[] {
         return BoltOnUnitFactory.modelNames;
     }
     create = (modelName:typeof BoltOnUnitFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "偵察要請装置":
                 return new WeaponOnMinimap(new BoltOnUnit());
         }
     }
 }
 // 要請兵器系統
 class BoltOnUnit implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }