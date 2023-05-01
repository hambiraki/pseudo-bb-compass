import { ref } from "vue";

export class Length {
  static pxpmScale = ref(1); // scale[px/m]
  private constructor(readonly m: number) {}
  static byMeter(meter: number): Length {
    return new Length(meter);
  }
  static byPixel(pixel: number): Length {
    return new Length(pixel / Length.pxpmScale.value);
  }
  get px(): number {
    return this.m * Length.pxpmScale.value;
  }

  plus(addend: Length): Length {
    return Length.byPixel(this.px + addend.px);
  }
  minus(subtrahend: Length): Length {
    return Length.byPixel(this.px - subtrahend.px);
  }
  times = (magnification: number): Length => {
    return Length.byPixel(this.px * magnification);
  };
  readonly ratio = (divisor: Length): number => {
    return this.px / divisor.px;
  };
}

export class Time {
  constructor(private readonly second: number) {}
  get s(): number {
    return this.second;
  }
  get ms(): number {
    return this.second * 1000;
  }
}

export class Speed {
  constructor(private readonly meter_per_second: number) {}
  static by(length: Length, time: Time): Speed {
    return new Speed(length.m / time.s);
  }
  times(time: Time): Length {
    return Length.byMeter(this.meter_per_second * time.s);
  }
  takeToGo(length: Length): Time {
    return new Time(length.m / this.meter_per_second);
  }
}

export class Coordinates {
  constructor(readonly x: Length, readonly y: Length) {}
  static byPolar = (length: Length, angle: Angle): Coordinates => {
    return new Coordinates(
      length.times(Math.cos(angle.radian)),
      length.times(Math.sin(angle.radian))
    );
  };
  get argument(): Angle {
    return Angle.byRadian(Math.atan2(this.y.px, this.x.px));
  }
  plus(addend: Coordinates): Coordinates {
    return new Coordinates(this.x.plus(addend.x), this.y.plus(addend.y));
  }
  minus(subtrahend: Coordinates): Coordinates {
    return new Coordinates(
      this.x.minus(subtrahend.x),
      this.y.minus(subtrahend.y)
    );
  }
}

export class Angle {
  private constructor(readonly degree: number) {}
  static byDegree(degree: number): Angle {
    return new Angle(degree);
  }
  static byRadian(radian: number) {
    return new Angle((radian / Math.PI) * 180);
  }
  get radian(): number {
    return (this.degree / 180) * Math.PI;
  }
  get rightFace(): Angle {
    return new Angle(this.degree + 90);
  }
  get leftFace(): Angle {
    return new Angle(this.degree - 90);
  }
  plus(addend: Angle): Angle {
    return new Angle(this.degree + addend.degree);
  }
  times(magnification: number): Angle {
    return new Angle(this.degree * magnification);
  }
}
