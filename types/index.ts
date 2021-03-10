import { DateTime } from 'luxon'

export interface Coordinate {
  latitude: number
  longitude: number
  toString(): string
}

export interface StopLocation {
  name: string
  y: string
  x: string
  id: string
  coordinate: Coordinate
}

export interface Track {
  track: string | undefined
  rtTrack: string | undefined
  changed: boolean
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
  departure: JourneyDate
  track: Track | null
  journey: string
}

export interface JourneyDate {
  date: string
  time: string
  datetime: DateTime
  rtDate: string | undefined
  rtTime: string | undefined
  rtDatetime: DateTime | undefined
  changed: boolean
}

export interface JourneyStop {
  name: string
  routeIdx: number
  coordinate: Coordinate
  departure: JourneyDate | undefined
  arrival: JourneyDate | undefined
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
