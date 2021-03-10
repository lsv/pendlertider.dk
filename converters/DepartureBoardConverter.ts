import { Departure } from '~/types'
import DateFormatter from "~/converters/DateFormatter";

function journeyRefToString(ref: string): string {
  return ref.replace(
    'http://webapp.rejseplanen.dk/bin//rest.exe',
    ''
  )
}

function journeyRefToId(ref: string): string {
  ref = journeyRefToString(ref)
  ref = ref.replace('/journeyDetail?ref=', '')
  ref = decodeURIComponent(ref.replace(/\+/g,  " "))
  ref = ref.substring(0, ref.indexOf('?'))
  ref = ref.replace(/\//g, '00')
  return ref
}

export default function (json: any): Array<Departure> {
  const output: Array<Departure> = []

  json.DepartureBoard.Departure?.forEach((element: any) => {
    if (
      typeof element?.name === 'string' &&
      typeof element?.type === 'string' &&
      typeof element?.stop === 'string' &&
      typeof element?.time === 'string' &&
      typeof element?.date === 'string' &&
      typeof element?.messages === 'string' &&
      typeof element?.finalStop === 'string' &&
      typeof element?.direction === 'string' &&
      typeof element?.JourneyDetailRef?.ref === 'string'
    ) {
      let datetimeChanged = false
      let date = element.date
      let time = element.time
      if (element?.rtDate) {
        datetimeChanged = true
        date = element.rtDate
      }

      if (element?.rtTime) {
        datetimeChanged = true
        time = element.rtTime
      }

      let rtDatetime = undefined
      if (datetimeChanged) {
        rtDatetime = DateFormatter.fromRejseplanen(date, time)
      }

      let track: string | undefined = element?.track
      let rtTrack: string | undefined = element?.rtTrack
      let trackChanged: boolean = false
      if (rtTrack && !track) {
        track = rtTrack
      }

      if (track && !rtTrack) {
        rtTrack = track
      }

      if (track !== rtTrack) {
        trackChanged = true
      }

      output.push({
        name: element.name,
        type: element.type,
        stop: element.stop,
        id: journeyRefToId(element.JourneyDetailRef.ref),
        line: element.line,
        trainDate: {
          track: track,
          rtTrack: rtTrack,
          trackChanged: trackChanged,
          date: element.date,
          rtDate: element?.rtDate,
          dateChanged: element?.rtDate === undefined ? false : element.date !== element.rtDate,
          time: element.time,
          rtTime: element?.rtTime,
          timeChanged: element?.rtTime === undefined ? false : element.time !== element.rtTime,
          datetime: DateFormatter.fromRejseplanen(element.date, element.time),
          rtDatetime: rtDatetime,
          datetimeChanged: datetimeChanged
        },
        messages: parseInt(element.messages),
        finalStop: element.finalStop,
        direction: element.direction,
        journey: journeyRefToString(element.JourneyDetailRef.ref),
      })
    }
  })

  function compare(a: Departure, b: Departure) {
    let aTime = a.trainDate.datetime
    if (a.trainDate?.rtDatetime) {
      aTime = a.trainDate.rtDatetime
    }

    let bTime = b.trainDate.datetime
    if (b.trainDate?.rtDatetime) {
      bTime = b.trainDate.rtDatetime
    }

    if (aTime < bTime) {
      return -1
    }

    if (bTime < aTime) {
      return 1
    }

    return 0
  }

  return output.sort(compare)
}
