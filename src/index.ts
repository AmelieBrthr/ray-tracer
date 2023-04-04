import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

// as HTMLCanvasElement permet de dire que notre élément est non nul
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// permet de dire que le contaxte est bien un CanvasRenderingContext2D
if (ctx == null) {
  throw new Error("Could not load 2D context");
}

// permet de dessiner un carré
// ctx.fillRect(50, 50, 50, 50)

const imageWidth = 500
const imageHeight = 500
const aspectRatio = imageWidth / imageHeight
canvas.width = imageWidth
canvas.height = imageHeight

const viewportHeight = 2
const viewportWidth = aspectRatio * viewportHeight
const focalLength = 1

const origin = new Vector3(0, 0, 0)
const horizontal = new Vector3(viewportWidth, 0, 0)
const vertical = new Vector3(0, -viewportHeight, 0)
const lowerLeftCorner = Vector3.sub(
  Vector3.sub(
    Vector3.sub(
      origin,
      Vector3.div(horizontal, 2)
    ),
    Vector3.div(vertical, 2)
  ),
  new Vector3(0, 0, focalLength)
)

// permet d'accéder aux données de pixel de la canvas
const imageData = ctx.createImageData(imageWidth, imageHeight)
const buffer = imageData.data;

// permet de définir la valeur de la couleur du pixel en fonction de son emplacement
function setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 1) {
  const i = (x + y * imageWidth) * 4
  buffer[i] = r * 255
  buffer[i + 1] = g * 255
  buffer[i + 2] = b * 255
  buffer[i + 3] = a * 255
}

function hitSphere(center: Vector3, radius: number, r: Ray): number{
  const oc = Vector3.sub(r.origin, center)
  const a = r.direction.lengthSquared()
  const halfB = Vector3.dot(oc, r.direction)
  const c = oc.lengthSquared() - radius * radius
  const discriminant = halfB * halfB -  a * c
  if (discriminant < 0) {
    return -1
  } else {
    return (-halfB -Math.sqrt(discriminant)) / a
  }
}

function rayColor(r: Ray) {
  let t = hitSphere(new Vector3(0, 0, -1), 0.5, r)
  if (t > 0) {
    const N = Vector3.unitVector(Vector3.sub(r.at(t), new Vector3(0, 0, -1)))
    return Vector3.scale(new Vector3(N.x + 1, N.y + 1, N.z + 1,), 0.5)
  }

  const unitDirection = Vector3.unitVector(r.direction)
  t = 0.5 * unitDirection.y + 1
  return new Vector3(1, 1, 1).mul(1 - t).add(new Vector3(0.5, 0.7, 1.0).mul(t))
}

// on itère sur chaque pixel pour pouvoir lui donner une couleur grâce à setPixel
for (let y = 0; y < imageHeight; y++) {
  for (let x = 0; x < imageWidth; x++) {
    const u = x / (imageWidth - 1)
    const v = y / (imageHeight - 1)
    const uVector = Vector3.scale(horizontal, u)
    const vVector = Vector3.scale(vertical, v)
    const r = new Ray(origin, Vector3.sub(Vector3.add(Vector3.add(lowerLeftCorner, uVector), vVector), origin))
    const color = rayColor(r)
    setPixel(x, y, color.x, color.y, color.z)
  }
}

// on affiche les pixels colorés
ctx.putImageData(imageData, 0, 0)
