import { Arrival } from '~/types'
import {compare, journeyRefToId, JourneyDateConverter, departureTrack, journeyRefToString} from "~/converters/DepartureBoardConverter";

export default function (json: any): Array<Arrival> {
  const output: Array<Arrival> = []

  json.ArrivalBoard.Arrival?.forEach((element: any) => {
    if (
      typeof element?.name === 'string' &&
      typeof element?.type === 'string' &&
      typeof element?.stop === 'string' &&
      typeof element?.time === 'string' &&
      typeof element?.date === 'string' &&
      typeof element?.messages === 'string' &&
      typeof element?.origin === 'string' &&
      typeof element?.JourneyDetailRef?.ref === 'string'
    ) {
      output.push({
        name: element.name,
        type: element.type,
        stop: element.stop,
        id: journeyRefToId(element.JourneyDetailRef.ref),
        line: element.line,
        time: JourneyDateConverter(element),
        track: departureTrack(element),
        messages: parseInt(element.messages),
        origin: element.origin,
        journey: journeyRefToString(element.JourneyDetailRef.ref),
        cancelled: !!element?.cancelled
      })
    }
  })

  return output.sort(compare)
}
