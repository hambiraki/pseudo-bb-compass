import { SensorFactory } from "./sensor";
export class SeriesFactory {
    static seriesNames = [
        "索敵センサー",
    ];
    create = (seriesName) => {
        switch (seriesName) {
            case "索敵センサー":
                return new SensorFactory();
        }
    };
}
