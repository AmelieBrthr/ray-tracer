import { HitRecord, Hittable } from "./Hittable";
import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export class Sphere implements Hittable {
  constructor(public center: Vector3, public radius: number) {
  }

  hit(r: Ray, tMin: number, tMax: number): HitRecord | null {
    const oc = Vector3.sub(r.origin, this.center)
    const a = r.direction.lengthSquared()
    const halfB = Vector3.dot(oc, r.direction)
    const c = oc.lengthSquared() - this.radius * this.radius
    const discriminant = halfB * halfB -  a * c
    if (discriminant < 0) {
      return null
    }
    const sqrtd = Math.sqrt(discriminant)

    let root = (-halfB - sqrtd) / a
    if (root < tMin || tMax < root) {
      root = (-halfB + sqrtd) / a
      if (root < tMin || tMax < root) {
        return null
      }
    }

    const rec = new HitRecord(
      r.at(root),
      root,
    )
    const outwardNormal = Vector3.div(Vector3.sub(rec.p, this.center), this.radius)
    rec.setFaceNormal(r, outwardNormal)
    return rec;
  }
}
