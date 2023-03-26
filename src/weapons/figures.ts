import { Length, Coordinates, type Angle, Time, Speed } from "@/units";
import type { Area } from "./weapon-on-minimap";


export const makeCircle = (center:Coordinates, radius:Length):Path2D => {
    const area = new Path2D();
    area.moveTo( center.x.plus(radius).px , center.y.px );
    area.arc(
        center.x.px,
        center.y.px,
        radius.px,
        0,
        2 * Math.PI
    );
    return area;
};

export const makeLine = (
    center:Coordinates, radius:Length, rotation:Angle
): Path2D =>{
    const area = new Path2D();
    const beginPoint = center.minus(Coordinates.byPolar(radius, rotation));
    area.moveTo(beginPoint.x.px, beginPoint.y.px);
    const endPoint = center.plus(Coordinates.byPolar(radius, rotation));
    area.lineTo(endPoint.x.px, endPoint.y.px);
    return area;
}
// 索敵センサー系統
class Sensor implements Area{
    private readonly radius: Length;
    constructor(status:{
        mRadius:number
    }){
        this.radius = Length.byMeter(status.mRadius);
    };
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        return makeCircle(location,this.radius)
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        return this.whole(location,rotation);
    };
}

// ND索敵センサー系統
class NdSensor implements Area{
    constructor(status:{
        mRadius:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        
    };
}

// BRトラッカー系統
class BrTracker implements Area{
    constructor(status:{
        mRadius:number; degCenter:number; sToFull:number; sRetention:number; sPause:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        
    };
}

// 滞空索敵弾系統
class Balloon implements Area{
    constructor(status:{
        mRadius:number; sLifetime:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        
    };
}

// Vセンサー投射器A系統
class VSensorA implements Area{
    constructor(status:{
        mRadius:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

// Vセンサー投射器B系統
class VSensorB implements Area{
    constructor(status:{
        mRadius:number; sLifetime:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

// 偵察機系統
class Scoutor implements Area{
    private readonly radius:Length;
    private readonly speed:Speed;
    private readonly lifetime:Time;
    constructor(status:{
        mRadius:number; mpsSpeed:number; mDistance:number;
    }){
        this.radius = Length.byMeter(status.mRadius);
        this.speed = new Speed(status.mpsSpeed);
        this.lifetime = this.speed.takeToGo(
            Length.byMeter(status.mDistance));
    };

    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        area.arc(
            location.x.px,
            location.y.px,
            this.radius.px,
            rotation.radian + Math.PI / 2,
            rotation.radian - Math.PI / 2,
        );
        const endAreaCenter = location.plus(
            Coordinates.byPolar(this.speed.times(this.lifetime), rotation)
        );
        area.arc(
            endAreaCenter.x.px,
            endAreaCenter.y.px,
            this.radius.px,
            rotation.radian - Math.PI / 2,
            rotation.radian + Math.PI / 2,
        );
        area.closePath();
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        if(time.s > this.lifetime.s) return new Path2D();
        return makeCircle(
            location.plus(Coordinates.byPolar(this.speed.times(time),rotation)),
            this.radius
        );
    };
}

// クリアリングソナー系統
class Sonar implements Area{
    constructor(status:{
        mRadius:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

// レーダーユニット系統
class Rader implements Area{
    constructor(status:{
        mRadius:number; degCenter:number; sToFull:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        
    };
}

// 要請兵器系統
class BoltOnUnit implements Area{
    constructor(status:{
        mRadius:number; mpsSpeed:number; mDistance:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();
        
        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{
        
    };
}

// FJ－アジテーター系統
class Agitator implements Area{
    constructor(status:{
        mRadius:number; sLifetime:number
    }){}
    whole = (location:Coordinates, rotation:Angle):Path2D => {
        const area = new Path2D();

        return area;
    };
    at = (location:Coordinates, rotation:Angle, time: Time): Path2D =>{

    };
}

export const weapon2figure = {
    "sensor" : Sensor,
    "nd_sensor": NdSensor,
    "br_tracker": BrTracker,
    "balloon": Balloon,
    "v_sensor_a": VSensorA,
    "v_sensor_b": VSensorB,
    "scoutor" : Scoutor,
    "sonar": Sonar,
    "rader": Rader,
    "bolt_on_unit": BoltOnUnit,
    "agitator": Agitator,
};

const bbb = (arg:"sensor"|"nd_sensor"|"scoutor") => {
    if(arg==="sensor"){const aaa = weapon2figure[arg];}
    return new weapon2figure[arg]({mRadius:3});
}