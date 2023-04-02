export class Vector3 {
  public e: [number, number, number];

  get x(): number {
    return this.e[0];
  }

  get y(): number {
    return this.e[1];
  }

  get z(): number {
    return this.e[2]
  }

  // = 0 permet d'assigner une valeur par défaut
  constructor(e0: number = 0, e1: number = 0, e2: number = 0) {
    this.e = [e0, e1, e2];
  }

  invert(): Vector3 {
    return new Vector3(-this.e[0], -this.e[1], -this.e[2])
  }

  add(v: Vector3): this {
    this.e[0] += v.e[0]
    this.e[1] += v.e[1]
    this.e[2] += v.e[2]
    return this
  }

  mul(f: number): this {
    this.e[0] *= f
    this.e[1] *= f
    this.e[2] *= f
    return this
  }

  div(f: number): this {
    return this.mul(1/f)
  }

  lengthSquared(): number {
    return this.e[0] ** 2 + this.e[1] ** 2 + this.e[2] ** 2
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  // static permet de définir des méthode de classe
  static add(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.e[0] + b.e[0], a.e[1] + b.e[1], a.e[2] + b.e[2])
  }

  static sub(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.e[0] - b.e[0], a.e[1] - b.e[1], a.e[2] - b.e[2])
  }

  static mul(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.e[0] * b.e[0], a.e[1] * b.e[1], a.e[2] * b.e[2])
  }

  static div(a: Vector3, f: number): Vector3 {
    return Vector3.scale(a, 1/f)
  }

  static scale(v: Vector3, f: number): Vector3 {
    return new Vector3(v.e[0] * f, v.e[1] * f, v.e[2] * f)
  }

  static dot(a: Vector3, b: Vector3): number {
    return a.e[0] * b.e[0] + a.e[1] * b.e[1] + a.e[2] * b.e[2]
  }

  static cross(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(
      a.e[1] * b.e[2] - a.e[2] * b.e[1],
      a.e[2] * b.e[0] - a.e[0] * b.e[2],
      a.e[0] * b.e[1] - a.e[1] * b.e[0]
    )
  }

  static unitVector(v: Vector3): Vector3 {
    return Vector3.div(v, v.length())
  }
}
