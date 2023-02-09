export class Length {
    pxLength;
    static scale = 1; // scale[m/px]
    constructor(pxLength) {
        this.pxLength = pxLength;
    }
    static byMeter(mLength) {
        return new Length(mLength / Length.scale);
    }
    static byPixel(pxLength) {
        return new Length(pxLength);
    }
    get meter() { return this.pxLength * Length.scale; }
    get pixel() { return this.pxLength; }
    static subtraction(minuend, subtrahend) {
        return Length.byPixel(minuend.pixel - subtrahend.pixel);
    }
    static division(dividend, divisor) {
        return dividend.pixel / divisor.pixel;
    }
}
