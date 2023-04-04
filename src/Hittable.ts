import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export interface HitRecord {
  p: Vector3
  normal: Vector3
  t: number
}

export interface Hittable {
  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean;
}
