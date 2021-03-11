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

export interface Board {
  name: string
  type: string
  stop: string
  line: string | undefined
  id: string
  messages: number
  journey: string
  track: Track | null
  time: JourneyDate
}

export interface Departure  extends Board {
  finalStop: string
  direction: string
  cancelled: boolean
}

export interface Arrival extends Board {
  origin: string | null
  cancelled: boolean
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
  arrivalBoard(id: string, nexttime: DateTime | null, useTrain: boolean, useMetro: boolean, useBus: boolean): Promise<Arrival[]>
  journey(element: Departure): Promise<Journey>
}
