import type { Map } from "./map";

export interface MapLocateFactory{
    get situations():readonly string[];
    create(situation:string):Map;
}

export type MapSituation = typeof MapLocateFactory.locates[number];

export class MapLocateFactory{
    static readonly locates = [
        "旧ブロア市街地",
    ] as const;
    create = (seriesName:MapSituation):MapLocateFactory => {
        switch(seriesName){
            case "旧ブロア市街地":
                return new SensorFactory();
        }
    }
}