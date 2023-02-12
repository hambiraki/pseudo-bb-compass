import {} from "./sensor";
import type { WeaponOnMinimap } from "./weapon-on-minimap";

export interface ModelFactory{
    create(modelName:string):WeaponOnMinimap;
}

export class SeriesFactory{
    static readonly seriesNames = [
        "索敵センサー",
    ] as const;
    create = (seriesName:typeof SeriesFactory.seriesNames[number]):ModelFactory => {
        switch(seriesName){
            case "索敵センサー":
                return new Se();
        }
    }
}