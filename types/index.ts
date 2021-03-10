import { DateTime } from 'luxon'

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface StopLocation {
  name: string
  y: string
  x: string
  id: string
  coordinate: Coordinate
}

export interface TrainDate {
  track: string | undefined
  rtTrack: string | undefined
  trackChanged: boolean
  date: string
  rtDate: string | undefined
  dateChanged: boolean
  time: string
  rtTime: string | undefined
  timeChanged: boolean,
  datetime: DateTime,
  rtDatetime: DateTime | undefined,
  datetimeChanged: boolean
}

export interface Departure {
  name: string
  type: string
  stop: string
  line: string | undefined
  id: string
  messages: number
  finalStop: string
  direction: string
  trainDate: TrainDate
  journey: string
}

export interface JourneyStop {
  name: string
  routeIdx: number
  coordinate: Coordinate
  depTime: string
  depDate: string
  arrTime: string | null
  arrDate: string | null
  note: string | null
}

export interface JourneyMessage {
  header: string
  text: string
}

export interface Journey {
  stops: Array<JourneyStop>
  messages: Array<JourneyMessage>
}

export interface Api {
  search(query: string): Promise<StopLocation[]>
  station(id: string): Promise<StopLocation>
  departureBoard(id: string, nexttime: DateTime | null, useTrain: boolean, useMetro: boolean, useBus: boolean): Promise<Departure[]>
  journey(element: Departure): Promise<Journey>
}
