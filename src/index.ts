import { HitRecord, Hittable } from "./Hittable";
import { HittableList } from "./HittableList";
import { Ray } from "./Ray";
import { Sphere } from "./Sphere";
import { Vector3 } from "./Vector3";
import { Camera } from "./Camera";
import { randomRange } from "./utils";
import { Dielectric, Lambertian, Metal } from "./Material";

// as HTMLCanvasElement permet de dire que notre élément est non nul
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// permet de dire que le contaxte est bien un CanvasRenderingContext2D
if (ctx == null) {
  throw new Error("Could not load 2D context");
}

// permet de dessiner un carré
// ctx.fillRect(50, 50, 50, 50)

const infinity = Number.POSITIVE_INFINITY
const pi = Math.PI

const samplePerPixel = 10
const cam = new Camera()

const imageWidth = 400
const imageHeight = Math.floor(imageWidth / cam.aspectRatio)
const maxDepth = 50

canvas.width = imageWidth
canvas.height = imageHeight

const imageData = ctx.createImageData(imageWidth, imageHeight)
const buffer = imageData.data;

const materialGround = new Lambertian(new Vector3(0.8, 0.8, 0))
const materailCenter = new Dielectric(1.5)
const materialLeft = new Dielectric(1.5)
const materialRight = new Metal(new Vector3(0.8, 0.6, 0.2), 1)

const world = new HittableList()
world.add(new Sphere(new Vector3(0,-100.5,-1), 100, materialGround))
world.add(new Sphere(new Vector3(0,0,-1), 0.5, materailCenter))
world.add(new Sphere( new Vector3(-1, 0, -1), 0.5, materialLeft))
world.add(new Sphere(new Vector3(1, 0, -1), 0.5, materialRight))


// const viewportHeight = 2
// const viewportWidth = aspectRatio * viewportHeight
// const focalLength = 1

// const origin = new Vector3(0, 0, 0)
// const horizontal = new Vector3(viewportWidth, 0, 0)
// const vertical = new Vector3(0, -viewportHeight, 0)
// const lowerLeftCorner = Vector3.sub(
//   Vector3.sub(
//     Vector3.sub(
//       origin,
//       Vector3.div(horizontal, 2)
//     ),
//     Vector3.div(vertical, 2)
//   ),
//   new Vector3(0, 0, focalLength)
// )

// permet d'accéder aux données de pixel de la canvas

// permet de définir la valeur de la couleur du pixel en fonction de son emplacement
function setPixel(x: number, y: number, r: number, g: number, b: number, samplePerPixel: number) {
  const i = (x + y * imageWidth) * 4
  const scale = 1 / samplePerPixel
  buffer[i] = Math.sqrt(r  * scale) * 255
  buffer[i + 1] = Math.sqrt(g  * scale) * 255
  buffer[i + 2] = Math.sqrt(b  * scale) * 255
  buffer[i + 3] = 255
}

function rayColor(r: Ray, world: Hittable, depth: number): Vector3 {
  if (depth <= 0) {
    return new Vector3(0, 0, 0)
  }

  const rec = world.hit(r, 0.001, infinity)
  // let t = hitSphere(new Vector3(0, 0, -1), 0.5, r)

  if (rec) {
    // const N = Vector3.unitVector(Vector3.sub(r.at(t), new Vector3(0, 0, -1)))
    // return Vector3.scale(new Vector3(N.x + 1, N.y + 1, N.z + 1,), 0.5)
    // const target = Vector3.randomInUnitSphere().add(rec.p).add(rec.normal).add(Vector3.randomUnitVector())
    // return Vector3.scale(rayColor(new Ray(rec.p, Vector3.sub(target, rec.p)), world, depth - 1), 0.5)
    const scatterResult = rec.mat.scatter(r, rec)
    if (scatterResult) {
      return Vector3.mul(rayColor(scatterResult.scattered, world, depth - 1), scatterResult.attenuation)
    }
    return new Vector3(0, 0, 0)
  }

  const unitDirection = Vector3.unitVector(r.direction)
  const t = 0.5 * (unitDirection.y + 1)
  return (new Vector3(1, 1, 1).mul(1 - t)).add(new Vector3(0.5, 0.7, 1.0).mul(t))
}

function degreesToRadians(degrees: number) {
  return degrees * pi / 180
}

// on itère sur chaque pixel pour pouvoir lui donner une couleur grâce à setPixel
// for (let y = 0; y < imageHeight; y++) {
//   for (let x = 0; x < imageWidth; x++) {
//     const u = x / (imageWidth - 1)
//     const v = y / (imageHeight - 1)
//     const uVector = Vector3.scale(horizontal, u)
//     const vVector = Vector3.scale(vertical, v)
//     const r = new Ray(origin, Vector3.sub(Vector3.add(Vector3.add(lowerLeftCorner, uVector), vVector), origin))
//     const color = rayColor(r, world)
//     setPixel(x, y, color.x, color.y, color.z)
//   }
// }

for (let j = imageHeight - 1; j >= 0; j--) {
  for (let i = 0; i < imageWidth; i++) {
    const pixelColor = new Vector3(0, 0, 0)
    for (let s = 0; s < samplePerPixel; s++) {
      const u = (i + Math.random()) / (imageWidth - 1)
      const v = (j + Math.random()) / (imageHeight - 1)
      const r = cam.getRay(u, v)
      pixelColor.add(rayColor(r, world, maxDepth))
    }
    setPixel(i, j, pixelColor.x, pixelColor.y, pixelColor.z, samplePerPixel)
  }
}

// on affiche les pixels colorés
ctx.putImageData(imageData, 0, 0)
