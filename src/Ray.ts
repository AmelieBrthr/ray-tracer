import { Vector3 } from "./Vector3";

export class Ray {
// public permet de créer un membre ayant le même nom que le paramètre
  constructor(public origin: Vector3, public direction: Vector3) {
  }

  at(t: number): Vector3 {
    return Vector3.add(this.origin, Vector3.scale(this.direction, t))
  }
}
