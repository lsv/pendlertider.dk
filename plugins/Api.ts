import Vue from 'vue'
import Axios, { AxiosResponse } from 'axios'
import { DateTime } from 'luxon'
import StopLocationConverter from '~/converters/StopLocationConverter'
import DepartureBoardConverter from '~/converters/DepartureBoardConverter'
import {
  StopLocation,
  Api,
  Departure,
  Journey,
  Arrival,
  Coordinate,
} from '~/types'
import DateFormatter from '~/converters/DateFormatter'
import JourneyDetailConverter from '~/converters/JourneyDetailConverter'
import ArrivalBoardConverter from '~/converters/ArrivalBoardConverter'

const BASEURL = 'https://xmlopen.rejseplanen.dk/bin/rest.exe'

const ApiClass = new (class implements Api {
  search(query: string): Promise<StopLocation[]> {
    return Axios.get(`${BASEURL}/location?input=${query}&format=json`)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return StopLocationConverter(json)
      })
  }

  closest(coord: Coordinate): Promise<StopLocation[]> {
    return Axios.get(
      `${BASEURL}/stopsNearby?coordX=${coord.getXBit()}&coordY=${coord.getYBit()}&format=json`
    )
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return StopLocationConverter(json)
      })
  }

  station(id: string): Promise<StopLocation> {
    return Axios.get(`${BASEURL}/location?input=${id}&format=json`)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return StopLocationConverter(json)[0]
      })
  }

  departureBoard(
    id: string,
    nexttime: DateTime | null,
    useTrain: boolean,
    useMetro: boolean,
    useBus: boolean
  ): Promise<Departure[]> {
    const url = this.boardUrl(
      'departureBoard',
      id,
      nexttime,
      useTrain,
      useMetro,
      useBus
    )
    return Axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((data: any) => {
        return DepartureBoardConverter(data)
      })
  }

  arrivalBoard(
    id: string,
    nexttime: DateTime | null,
    useTrain: boolean,
    useMetro: boolean,
    useBus: boolean
  ): Promise<Arrival[]> {
    const url = this.boardUrl(
      'arrivalBoard',
      id,
      nexttime,
      useTrain,
      useMetro,
      useBus
    )
    return Axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((data: any) => {
        return ArrivalBoardConverter(data)
      })
  }

  journey(element: Departure): Promise<Journey> {
    const url = `https://webapp.rejseplanen.dk/bin/rest.exe${element.journey}`
    return Axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return JourneyDetailConverter(json)
      })
  }

  private boardUrl(
    url: string,
    id: string,
    nexttime: DateTime | null,
    useTrain: boolean,
    useMetro: boolean,
    useBus: boolean
  ): string {
    let baseurl = `${BASEURL}/${url}?id=${id}&format=json`
    if (!useTrain) {
      baseurl += '&useTog=0'
    }

    if (!useMetro) {
      baseurl += '&useMetro=0'
    }

    if (!useBus) {
      baseurl += '&useBus=0'
    }

    if (nexttime) {
      baseurl += `&date=${DateFormatter.toRejseplanenDate(nexttime)}`
      baseurl += `&time=${DateFormatter.toRejseplanenTime(nexttime)}`
    }

    return baseurl
  }
})()

// noinspection JSUnusedGlobalSymbols
Vue.prototype.$api = ApiClass
