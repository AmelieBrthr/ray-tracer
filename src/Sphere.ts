import { HitRecord, Hittable } from "./Hittable";
import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export class Sphere implements Hittable {
  constructor(public center: Vector3, public radius: number){
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    const oc = Vector3.sub(r.origin, this.center)
    const a = r.direction.lengthSquared()
    const halfB = Vector3.dot(oc, r.direction)
    const c = oc.lengthSquared() - this.radius * this.radius
    const discriminant = halfB * halfB -  a * c
    if (discriminant < 0) {
      return false
    }
    const sqrtd = Math.sqrt(discriminant)

    let root = (-halfB - sqrtd) / a
    if (root < tMin || tMax < root) {
      root = (-halfB + sqrtd) / a
      if (root < tMin || tMax < root) {
        return false
      }
    }

    rec.t = root
    rec.p = r.at(rec.t)
    rec.normal = Vector3.div(Vector3.sub(rec.p, this.center), this.radius)
    return true
  }
}
