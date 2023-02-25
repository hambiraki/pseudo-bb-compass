import { BallonFactory } from "./balloon";
import { SensorFactory } from "./sensor";
import type { WeaponOnMinimap } from "./weapon-on-minimap";

export interface ModelFactory{
    get modelNames():readonly string[];
    create(modelName:string):WeaponOnMinimap;
}

export type SeriesName = typeof SeriesFactory.seriesNames[number];

export class SeriesFactory{
    static readonly seriesNames = [
        "索敵センサー",
        "滞空索敵弾",
    ] as const;
    create = (seriesName:SeriesName):ModelFactory => {
        switch(seriesName){
            case "索敵センサー":
                return new SensorFactory();
            case "滞空索敵弾":
                return new BallonFactory();
        }
    }
}