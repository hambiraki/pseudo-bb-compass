import { Length } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Coordinates, Rotation, Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
 /**
  * @package
  */
 export class ScoutorFactory implements ModelFactory{
     static readonly modelNames = [
         "ラーク偵察機",
         "ファルコン偵察機",
         "ストーク偵察機",
         "アウル偵察機",
         "ロビン偵察機",
         "カナリア偵察機",
         "マグ",
     ] as const;
     get modelNames():readonly string[] {
         return ScoutorFactory.modelNames;
     }
     create = (modelName:typeof ScoutorFactory.modelNames[number]):WeaponOnMinimap => {
         switch(modelName){
             case "ラーク偵察機":
                 return new WeaponOnMinimap(new Scoutor());
             case "ファルコン偵察機":
                 return new WeaponOnMinimap(new Scoutor());
             case "ストーク偵察機":
                 return new WeaponOnMinimap(new Scoutor());
             case "アウル偵察機":
                 return new WeaponOnMinimap(new Scoutor());
             case "ロビン偵察機":
                 return new WeaponOnMinimap(new Scoutor());
             case "カナリア偵察機":
                 return new WeaponOnMinimap(new Scoutor());
             case "マグ":
                 return new WeaponOnMinimap(new Scoutor());
         }
     }
 }
 // 偵察機系統
 class Scoutor implements Area{
     constructor(){};
     whole = (location:Coordinates, rotation:Rotation):Path2D => {
         const area = new Path2D();

         return area;
     };
     at = (location:Coordinates, rotation:Rotation, msecTime: number): Path2D =>{

     };
 }