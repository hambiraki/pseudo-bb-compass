export class Length {
    private pxLength:number;
    static scale:number = 1;  // scale[m/px]
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
    static subtraction(minuend:Length, subtrahend:Length):Length{
        return Length.byPixel(minuend.pixel - subtrahend.pixel);
    }
    static division(dividend:Length, divisor:Length):number{
        return dividend.pixel / divisor.pixel
    }
}
