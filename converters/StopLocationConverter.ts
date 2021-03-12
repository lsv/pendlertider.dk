import { StopLocation } from '~/types'
import { intsToCoordinate } from '~/helpers'

export default function (json: any): Array<StopLocation> {
  const output: Array<StopLocation> = []

  if (!Array.isArray(json.LocationList?.StopLocation)) {
    json.LocationList.StopLocation = [json.LocationList?.StopLocation]
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
