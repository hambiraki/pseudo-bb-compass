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
import type { Weapon } from "./weapon";


const unverifiedWeapons = {
    "索敵センサー": sensor,
    "ND索敵センサー": ndSensor,
    "BRトラッカー": brTracker,
    "滞空索敵弾":balloon,
    "Vセンサー投射器A":vSensorA,
    "Vセンサー投射器B":vSensorB,
    "偵察機": scoutor,
    "クリアリングソナー":sonar,
    "レーダーユニット":rader,
    "要請兵器":boltOnUnit,
    "FJ－アジテーター":agitator,
}
type raw = typeof unverifiedWeapons;
type Series<T> = T extends any ? Record<keyof T, Weapon> : never;
export const name2weapon: Record<keyof raw, Series<raw[keyof raw]>> = unverifiedWeapons;
