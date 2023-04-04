import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export class HitRecord {
  p: Vector3
  normal: Vector3
  t: number
  frontFace: boolean

  setFaceNormal(r: Ray, outwardNormal: Vector3): void {
    const frontFace = Vector3.dot(r.direction, outwardNormal) < 0
    this.normal = frontFace ? outwardNormal : outwardNormal.invert()
  }
}


export interface Hittable {
  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean;
}
