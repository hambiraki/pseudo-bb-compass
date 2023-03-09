import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class BrTrackerFactory implements ModelFactory{
     static readonly modelNames = [
         "BRトラッカー",
         "集中型BRトラッカー",
         "広域型BRトラッカー",
     ] as const;
     get modelNames():readonly string[] {
         return BrTrackerFactory.modelNames;
     }
     create = (modelName:typeof BrTrackerFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "BRトラッカー":
                 return new WeaponOnMinimap(new BrTracker());
             case "集中型BRトラッカー":
                 return new WeaponOnMinimap(new BrTracker());
             case "広域型BRトラッカー":
                 return new WeaponOnMinimap(new BrTracker());
         }
     }
 }
 // BRトラッカー系統
 class BrTracker implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }