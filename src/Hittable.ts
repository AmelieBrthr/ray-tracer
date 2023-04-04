import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export class HitRecord {
  constructor(
    public p: Vector3,
    public t: number,
    public normal: Vector3 = new Vector3(),
    public frontFace: boolean = false,
  ) {
  }

  setFaceNormal(r: Ray, outwardNormal: Vector3): void {
    const frontFace = Vector3.dot(r.direction, outwardNormal) < 0
    this.normal = frontFace ? outwardNormal : outwardNormal.invert()
  }
}

export interface Hittable {
  hit(r: Ray, tMin: number, tMax: number): HitRecord | null;
}
