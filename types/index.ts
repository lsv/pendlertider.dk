import { DateTime } from 'luxon'

export interface JsonTypeArray
  extends Array<string | number | boolean | Date | JsonType | JsonTypeArray> {}

export interface JsonType {
  [x: string]: string | number | boolean | Date | JsonType | JsonTypeArray
}

export type Coordinate = {
  latitude: number
  longitude: number
}

export type StopLocation = {
  name: string
  y: string
  x: string
  id: string
  coordinate: Coordinate
}

export type Departure = {
  name: string
  type: string
  stop: string
  time: string
  date: string
  datetime: DateTime
  line: string
  id: string
  messages: number
  finalStop: string
  direction: string
  journey: string
}

export interface Api {
  search(query: string): Promise<StopLocation[]>
  station(id: string): Promise<StopLocation>
  departureBoard(id: string): Promise<Departure[]>
}
