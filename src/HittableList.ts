import { HitRecord, Hittable } from "./Hittable";
import { Ray } from "./Ray";

export class HittableList implements Hittable {

  constructor(public objects: Hittable[] = []) {
  }

  add(hittable: Hittable): void {
    this.objects.push(hittable)
  }

  clear() : void {
    this.objects = []
  }

  hit(r: Ray, tMin: number, tMax: number): HitRecord | null {
    let rec: HitRecord | null = null;
    let closestSoFar = tMax

    for (let object of this.objects) {
      const tempRec = object.hit(r, tMin, closestSoFar)
      if (tempRec) {
        closestSoFar = tempRec.t
        rec = tempRec
      }
    }
    return rec
  }
}
