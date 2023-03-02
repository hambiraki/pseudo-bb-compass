import { BlouerFactory } from "./map-names";
import type { MapField } from "./map-field";

export interface MapSituationFactory{
    get situations():readonly string[];
    create(situation:string):MapField;
}

export type MapSituation = typeof MapLocateFactory.locates[number];

export class MapLocateFactory{
    static readonly locates = [
        "旧ブロア市街地",
    ] as const;
    create = (situation:MapSituation):MapSituationFactory => {
        switch(situation){
            case "旧ブロア市街地":
                return new BlouerFactory();
        }
    }
}
