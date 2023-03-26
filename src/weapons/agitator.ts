import { type Coordinates, Length, type Angle, Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import { makeCircle } from "./figures";

// FJ－アジテーター系統
class Agitator implements Area{
    private readonly radius: Length;
    private readonly lifetime: Time;
    constructor(status:Record<"mRadius"|"sLifetime", number>){
        this.radius = Length.byMeter(status.mRadius);
        this.lifetime = new Time(status.sLifetime)
    };
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        return makeCircle(location, this.radius);
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        if(time.s > this.lifetime.s) return new Path2D();
        return this.whole(location, rotation);
    };

}

export const agitator = {
    "FJ－アジテーター": new WeaponOnMinimap(new Agitator({mRadius:37.8, sLifetime:8.6})),
    "FJ－アジテーターC": new WeaponOnMinimap(new Agitator({mRadius:32.7, sLifetime:9.8})),
    "FJ－ジャバウォック": new WeaponOnMinimap(new Agitator({mRadius:44, sLifetime:14.3})),
};
