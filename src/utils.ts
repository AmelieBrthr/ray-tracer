export function randomRange(min:number, max:number) {
  return ((max - min) * Math.random()) + min
}

export function clamp(x:number, min:number, max:number) {
  if (x < min) {
    return min
  }
  if (x > max) {
    return max
  }
  return x
}
