import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class RaderFactory implements ModelFactory{
     static readonly modelNames = [
         "レーダーユニット",
         "レーダーユニットⅡ",
         "レーダーユニットⅢ",
     ] as const;
     get modelNames():readonly string[] {
         return RaderFactory.modelNames;
     }
     create = (modelName:typeof RaderFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "レーダーユニット":
                 return new WeaponOnMinimap(new Rader());
             case "レーダーユニットⅡ":
                 return new WeaponOnMinimap(new Rader());
             case "レーダーユニットⅢ":
                 return new WeaponOnMinimap(new Rader());
         }
     }
 }
 // レーダーユニット系統
 class Rader implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }