import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class NdSensorFactory implements ModelFactory{
     static readonly modelNames = [
         "ND索敵センサー",
         "小型ND索敵センサー",
         "広域ND索敵センサー",
     ] as const;
     get modelNames():readonly string[] {
         return NdSensorFactory.modelNames;
     }
     create = (modelName:typeof NdSensorFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "ND索敵センサー":
                 return new WeaponOnMinimap(new NdSensor());
             case "小型ND索敵センサー":
                 return new WeaponOnMinimap(new NdSensor());
             case "広域ND索敵センサー":
                 return new WeaponOnMinimap(new NdSensor());
         }
     }
 }
 // ND索敵センサー系統
 class NdSensor implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }