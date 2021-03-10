import {Coordinate} from "~/types";

export function intsToCoordinate(x: string | number, y: string | number): Coordinate {
  if (typeof x === 'string') {
    x = parseInt(x)
  }

  if (typeof y === 'string') {
    y = parseInt(y)
  }

  return {
    latitude: y / 10 ** 6,
    longitude: x / 10 ** 6,
    toString(): string {
      return `${this.latitude} ${this.longitude}`
    }
  }
}
