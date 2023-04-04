import { HitRecord, Hittable } from "./Hittable";
import { Ray } from "./Ray";

export class HittableList implements Hittable {

  constructor(public objects: Hittable[]) {
  }

  hit(r: Ray, tMin: number, tMax: number): HitRecord | null {
    let tempRec: HitRecord | null = null;
    let closestSoFar = tMax

    for (let object of this.objects) {
      tempRec = object.hit(r, tMin, closestSoFar)
      if (tempRec) {
        closestSoFar = tempRec.t
      }
    }
    return tempRec
  }
}
