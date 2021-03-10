import {Departure, JourneyDate, Track} from '~/types'
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

function departureTrack(element: any): Track {
  let track: string | undefined = element?.track
  let rtTrack: string | undefined = element?.rtTrack
  let changed: boolean = false
  if (rtTrack && !track) {
    track = rtTrack
  }

  if (track && !rtTrack) {
    rtTrack = track
  }

  if (track !== rtTrack) {
    changed = true
  }

  return {
    track,
    rtTrack,
    changed
  }
}

function departureDate(element: any): JourneyDate {
  let changed = false
  let date = element.date
  let time = element.time
  if (element?.rtDate) {
    changed = true
    date = element.rtDate
  }

  if (element?.rtTime) {
    changed = true
    time = element.rtTime
  }

  let rtDatetime = undefined
  if (changed) {
    rtDatetime = DateFormatter.fromRejseplanen(date, time)
  }

  return {
    date: element.date,
    time: element.time,
    datetime: DateFormatter.fromRejseplanen(element.date, element.time),
    rtDate: element?.rtDate,
    rtTime: element?.rtTime,
    rtDatetime,
    changed
  }
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
      output.push({
        name: element.name,
        type: element.type,
        stop: element.stop,
        id: journeyRefToId(element.JourneyDetailRef.ref),
        line: element.line,
        departure: departureDate(element),
        track: departureTrack(element),
        messages: parseInt(element.messages),
        finalStop: element.finalStop,
        direction: element.direction,
        journey: journeyRefToString(element.JourneyDetailRef.ref),
      })
    }
  })

  function compare(a: Departure, b: Departure) {
    let aTime = a.departure.datetime
    if (a.departure.rtDatetime) {
      aTime = a.departure.rtDatetime
    }

    let bTime = b.departure.datetime
    if (b.departure.rtDatetime) {
      bTime = b.departure.rtDatetime
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
