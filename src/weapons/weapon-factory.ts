 import { SensorFactory } from "./sensor";
 import { NdSensorFactory } from "./nd-sensor";
 import { BrTrackerFactory } from "./br-tracker";
 import { BalloonFactory } from "./balloon";
 import { VSensorAFactory } from "./v-sensor-a";
 import { VSensorBFactory } from "./v-sensor-b";
 import { ScoutorFactory } from "./scoutor";
 import { SonarFactory } from "./sonar";
 import { RaderFactory } from "./rader";
 import { BoltOnUnitFactory } from "./bolt-on-unit";
 import { AgitatorFactory } from "./agitator";
 import type { WeaponOnMinimap } from "./weapon-on-minimap";
 export interface ModelFactory{
     get modelNames():readonly string[];
     create(modelName:string):WeaponOnMinimap;
 }
 export type SeriesName = typeof SeriesFactory.seriesNames[number];
 export class SeriesFactory{
     static readonly seriesNames = [
         "索敵センサー",
         "ND索敵センサー",
         "BRトラッカー",
         "滞空索敵弾",
         "Vセンサー投射器A",
         "Vセンサー投射器B",
         "偵察機",
         "クリアリングソナー",
         "レーダーユニット",
         "要請兵器",
         "FJ－アジテーター",
     ] as const;
     create = (seriesName:SeriesName):ModelFactory => {
         switch(seriesName){
             case "索敵センサー":
                 return new SensorFactory();
             case "ND索敵センサー":
                 return new NdSensorFactory();
             case "BRトラッカー":
                 return new BrTrackerFactory();
             case "滞空索敵弾":
                 return new BalloonFactory();
             case "Vセンサー投射器A":
                 return new VSensorAFactory();
             case "Vセンサー投射器B":
                 return new VSensorBFactory();
             case "偵察機":
                 return new ScoutorFactory();
             case "クリアリングソナー":
                 return new SonarFactory();
             case "レーダーユニット":
                 return new RaderFactory();
             case "要請兵器":
                 return new BoltOnUnitFactory();
             case "FJ－アジテーター":
                 return new AgitatorFactory();
         }
     }
 }