import { HitRecord } from "./Hittable";
import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export interface ScatterResult {
  scattered: Ray;
  attenuation: Vector3;
}

export interface Material {
  scatter(rIn: Ray, rec: HitRecord): ScatterResult | null
}

export class Lambertian implements Material {
  constructor(
    public albedo: Vector3
  ) {
  }

  scatter(rIn: Ray, rec: HitRecord): ScatterResult | null {
    let scatterDirection = Vector3.add(rec.normal, Vector3.randomUnitVector())
    if (scatterDirection.nearZero()) {
      scatterDirection = rec.normal
    }
    const scattered = new Ray(rec.p, scatterDirection)
    const attenuation = this.albedo
    if (Vector3.dot(scattered.direction, rec.normal) > 0) {
      return { scattered, attenuation }
    } else {
      return null
    }
  }
}

export class Metal implements Material {
  constructor(
    public albedo: Vector3,
    public fuzz: number
  ) {
  }

  scatter(rIn: Ray, rec: HitRecord): ScatterResult | null {
    const reflected = Vector3.reflect(rIn.direction, rec.normal)
    const scattered = new Ray(rec.p, Vector3.add(reflected, Vector3.scale(Vector3.randomInUnitSphere(), this.fuzz)))
    const attenuation = this.albedo
    if (Vector3.dot(scattered.direction, rec.normal) > 0) {
      return {scattered, attenuation}
    } else {
      return null
    }
  }
}

export class Dielectric implements Material {
  constructor(
    public ir: number
  ) {
  }

  scatter(rIn: Ray, rec: HitRecord) {
    const attenuation = new Vector3(1.0, 1.0, 1.0)
    const refractionRatio = rec.frontFace ? (1 / this.ir) : 0
    const unitDirection = Vector3.unitVector(rIn.direction)
    const refracted = Vector3.refract(unitDirection, rec.normal, refractionRatio)
    const scattered = new Ray(rec.p, refracted)
    return {scattered, attenuation}
  }

}
