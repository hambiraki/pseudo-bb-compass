import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class SensorFactory implements ModelFactory{
     static readonly modelNames = [
         "索敵センサー",
         "小型索敵センサー",
         "広域索敵センサー",
         "新型索敵センサー",
     ] as const;
     get modelNames():readonly string[] {
         return SensorFactory.modelNames;
     }
     create = (modelName:typeof SensorFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "索敵センサー":
                 return new WeaponOnMinimap(new Sensor());
             case "小型索敵センサー":
                 return new WeaponOnMinimap(new Sensor());
             case "広域索敵センサー":
                 return new WeaponOnMinimap(new Sensor());
             case "新型索敵センサー":
                 return new WeaponOnMinimap(new Sensor());
         }
     }
 }
 // 索敵センサー系統
 class Sensor implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }