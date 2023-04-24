import { Ray } from "./Ray"
import { Vector3 } from "./Vector3"

export class Camera {
  readonly viewportWidth: number

  origin:Vector3
  horizontal:Vector3
  vertical:Vector3
  lowerLeftCorner:Vector3

  constructor(
    readonly viewportHeight = 2,
    readonly aspectRatio = 16.0 / 9.0,
    readonly focalLength = 1,
  ) {
    this.viewportWidth = this.aspectRatio * this.viewportHeight;
    this.origin = new Vector3(0, 0, 0)
    this.horizontal = new Vector3(this.viewportWidth, 0, 0)
    this.vertical = new Vector3(0, -this.viewportHeight, 0)
    this.lowerLeftCorner = Vector3.sub(
      Vector3.sub(
        Vector3.sub(
          this.origin,
          Vector3.div(this.horizontal, 2)
        ),
        Vector3.div(this.vertical, 2)
      ),
      new Vector3(0, 0, this.focalLength)
    )
  }

  getRay(u:number, v:number) {
    return new Ray(this.origin, Vector3.sub(Vector3.add(Vector3.add(this.lowerLeftCorner, Vector3.scale(this.horizontal, u)), Vector3.scale(this.vertical, v)), this.origin))
  }
}
