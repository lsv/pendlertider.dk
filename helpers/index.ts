import { Coordinate } from '~/types'

export function intsToCoordinate(
  xLongitude: string | number,
  yLatitude: string | number,
  isBit: boolean = true
): Coordinate {
  if (typeof xLongitude === 'string') {
    xLongitude = parseInt(xLongitude)
  }

  if (typeof yLatitude === 'string') {
    yLatitude = parseInt(yLatitude)
  }

  let latitude = yLatitude
  let longitude = xLongitude
  if (isBit) {
    latitude /= 1_000_000
    longitude /= 1_000_000
  }

  return {
    latitude,
    longitude,
    toString(): string {
      return `${this.latitude} ${this.longitude}`
    },
    getX(): number {
      return this.longitude
    },
    getXBit(): string {
      return (this.longitude * 1_000_000).toFixed(0)
    },
    getY(): number {
      return this.latitude
    },
    getYBit(): string {
      return (this.latitude * 1_000_000).toFixed(0)
    },
  }
}
