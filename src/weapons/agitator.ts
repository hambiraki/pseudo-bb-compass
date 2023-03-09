import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class AgitatorFactory implements ModelFactory{
     static readonly modelNames = [
         "FJ－アジテーター",
         "FJ－アジテーターC",
         "FJ－ジャバウォック",
     ] as const;
     get modelNames():readonly string[] {
         return AgitatorFactory.modelNames;
     }
     create = (modelName:typeof AgitatorFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "FJ－アジテーター":
                 return new WeaponOnMinimap(new Agitator());
             case "FJ－アジテーターC":
                 return new WeaponOnMinimap(new Agitator());
             case "FJ－ジャバウォック":
                 return new WeaponOnMinimap(new Agitator());
         }
     }
 }
 // FJ－アジテーター系統
 class Agitator implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }