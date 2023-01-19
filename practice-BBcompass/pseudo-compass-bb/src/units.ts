export class Length {
    private pxLength:number;
    static scale:number;  // scale[m/px]
    private constructor(pxLength:number){
        this.pxLength = pxLength
    }
    static byMeter(mLength:number){
        return new Length(mLength / Length.scale);
    }
    static byPixel(pxLength:number){
        return new Length(pxLength);
    }
    get meter():number{return this.pxLength * Length.scale;}
    get pixel():number{return this.pxLength;}
    difference(other:Length){
        return Length.byPixel(this.pixel - other.pixel);
    }
}