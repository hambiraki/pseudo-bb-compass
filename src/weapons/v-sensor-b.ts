import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class VSensorBFactory implements ModelFactory{
     static readonly modelNames = [
         "Vセンサー投射器",
         "小型Vセンサー投射器",
         "広域Vセンサー投射器",
         "H-Vセンサー投射器",
     ] as const;
     get modelNames():readonly string[] {
         return VSensorBFactory.modelNames;
     }
     create = (modelName:typeof VSensorBFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "Vセンサー投射器":
                 return new WeaponOnMinimap(new VSensorB());
             case "小型Vセンサー投射器":
                 return new WeaponOnMinimap(new VSensorB());
             case "広域Vセンサー投射器":
                 return new WeaponOnMinimap(new VSensorB());
             case "H-Vセンサー投射器":
                 return new WeaponOnMinimap(new VSensorB());
         }
     }
 }
 // Vセンサー投射器B系統
 class VSensorB implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }