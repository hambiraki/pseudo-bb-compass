import { Coordinates, Length, Angle, type Time } from "@/units";
import { WeaponOnMinimap } from "./weapon-on-minimap";
import type { Area } from "./weapon-on-minimap";
import type { ModelFactory } from "./weapon-factory";
import { makeCircle } from "./figures";
import { Speed } from "@/units";
import { assert } from "@vue/compiler-core";

type Options = {
    mRadius:number;
    mpsSpeed:number;
    mDistance:number;
};

const modelMap = new Map([
    ["ラーク偵察機", {mRadius:119,mpsSpeed:28,mDistance:250}],
    ["ファルコン偵察機", {mRadius:103,mpsSpeed:50,mDistance:500}],
    ["ストーク偵察機", {mRadius:113,mpsSpeed:2.6,mDistance:50}],
    ["アウル偵察機", {mRadius:142,mpsSpeed:14,mDistance:220}],
    ["ロビン偵察機", {mRadius:220,mpsSpeed:20,mDistance:150}],
    ["カナリア偵察機", {mRadius:266,mpsSpeed:25,mDistance:80}],
    ["マグ", {mRadius:176,mpsSpeed:16,mDistance:180}],
] as const);

type ModelName = typeof modelMap.keys extends () => IterableIterator<infer K>
    ? K
    : never;

/**
 * @package
 */
export class ScoutorFactory implements ModelFactory{
    get modelNames():readonly string[] {
        return Array.from(modelMap.keys());
    }
    create = (modelName:ModelName):WeaponOnMinimap => {
        const status = modelMap.get(modelName);
        assert(status !== undefined);
        if(status === undefined) throw Error;
        return new WeaponOnMinimap(new Scoutor(status));
    }
}
// 偵察機系統
class Scoutor implements Area{
    private readonly radius:Length;
    private readonly speed:Speed;
    private readonly lifetime:Time;
    constructor(status:Options){
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
            rotation.radian - Math.PI / 2
        );
        const endAreaCenter = location.plus(
            Coordinates.byPolar(this.speed.times(this.lifetime),rotation)
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