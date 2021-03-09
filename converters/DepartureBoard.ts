import { DateTime } from 'luxon'
import { Departure } from '~/types'

export default function (json: any): Array<Departure> {
  const output: Array<Departure> = []

  json.DepartureBoard.Departure.forEach((element: any) => {
    if (
      typeof element?.name === 'string' &&
      typeof element?.type === 'string' &&
      typeof element?.stop === 'string' &&
      typeof element?.time === 'string' &&
      typeof element?.date === 'string' &&
      typeof element?.id === 'string' &&
      typeof element?.line === 'string' &&
      typeof element?.messages === 'string' &&
      typeof element?.finalStop === 'string' &&
      typeof element?.direction === 'string' &&
      typeof element?.JourneyDetailRef.ref === 'string'
    ) {
      output.push({
        name: element.name,
        type: element.type,
        stop: element.stop,
        time: element.time,
        date: element.date,
        datetime: DateTime.fromFormat(
          `${element.date} ${element.time}`,
          'dd.MM.yy HH:mm'
        ),
        id: element.id,
        line: element.line,
        messages: parseInt(element.messages),
        finalStop: element.finalStop,
        direction: element.direction,
        journey: element.JourneyDetailRef.ref.replace(
          'http://webapp.rejseplanen.dk/bin//rest.exe',
          ''
        ),
      })
    }
  })

  return output
}
