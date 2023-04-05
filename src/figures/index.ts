import { sensor } from "./sensor";
import { scoutor } from "./scoutor";
import { ndSensor } from "./nd-sensor";
import { brTracker } from "./br-tracker";
import { balloon } from "./balloon";
import { vSensorA } from "./v-sensor-a";
import { vSensorB } from "./v-sensor-b";
import { sonar } from "./sonar";
import { rader } from "./rader";
import { boltOnUnit } from "./bolt-on-unit";
import { agitator } from "./agitator";
import { ObjectKeys } from "@/utils";
import type { Angle, Coordinates, Time } from "@/units";

export interface Area {
    whole(location: Coordinates, rotation: Angle): Path2D;
    at(location: Coordinates, rotation: Angle, time:Time): Path2D;
}

export const series2model = {
    "索敵センサー": ObjectKeys(sensor),
    "ND索敵センサー": ObjectKeys(ndSensor),
    "BRトラッカー": ObjectKeys(brTracker),
    "滞空索敵弾":ObjectKeys(balloon),
    "Vセンサー投射器A":ObjectKeys(vSensorA),
    "Vセンサー投射器B":ObjectKeys(vSensorB),
    "偵察機": ObjectKeys(scoutor),
    "クリアリングソナー":ObjectKeys(sonar),
    "レーダーユニット":ObjectKeys(rader),
    "要請兵器":ObjectKeys(boltOnUnit),
    "FJ－アジテーター":ObjectKeys(agitator),
}

export const model2weapon = {
    ...sensor,
    ...ndSensor,
    ...brTracker,
    ...balloon,
    ...vSensorA,
    ...vSensorB,
    ...scoutor,
    ...sonar,
    ...rader,
    ...boltOnUnit,
    ...agitator,
}
