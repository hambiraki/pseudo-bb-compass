import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class SonarFactory implements ModelFactory{
     static readonly modelNames = [
         "クリアリングソナー",
         "クリアリングソナーM",
         "クリアリングソナーW",
     ] as const;
     get modelNames():readonly string[] {
         return SonarFactory.modelNames;
     }
     create = (modelName:typeof SonarFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "クリアリングソナー":
                 return new WeaponOnMinimap(new Sonar());
             case "クリアリングソナーM":
                 return new WeaponOnMinimap(new Sonar());
             case "クリアリングソナーW":
                 return new WeaponOnMinimap(new Sonar());
         }
     }
 }
 // クリアリングソナー系統
 class Sonar implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }