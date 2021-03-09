import { Coordinate, JsonType, StopLocation } from '~/types'

function intsToCoordinate(x: string | number, y: string | number): Coordinate {
  if (typeof x === 'string') {
    x = parseInt(x)
  }

  if (typeof y === 'string') {
    y = parseInt(y)
  }

  return {
    latitude: y / 10 ** 6,
    longitude: x / 10 ** 6,
  }
}

export default function (json: any): Array<StopLocation> {
  const output: Array<StopLocation> = []

  if (! Array.isArray(json.LocationList?.StopLocation)) {
    json.LocationList.StopLocation = [json.LocationList?.StopLocation];
  }

  json.LocationList?.StopLocation?.forEach((element: any) => {
    if (
      typeof element?.name === 'string' &&
      typeof element?.x === 'string' &&
      typeof element?.y === 'string' &&
      typeof element?.id === 'string'
    ) {
      output.push({
        name: element.name,
        y: element.y,
        x: element.x,
        id: element.id,
        coordinate: intsToCoordinate(element.x, element.y),
      })
    }
  })

  return output
}
