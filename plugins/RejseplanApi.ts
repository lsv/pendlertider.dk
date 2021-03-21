import { AxiosResponse } from 'axios'
import { DateTime } from 'luxon'
import StopLocationConverter from '~/converters/StopLocationConverter'
import DepartureBoardConverter from '~/converters/DepartureBoardConverter'
import {
  StopLocation,
  RejseplanApi,
  Departure,
  Journey,
  Arrival,
  Coordinate,
} from '~/types'
import DateFormatter from '~/converters/DateFormatter'
import JourneyDetailConverter from '~/converters/JourneyDetailConverter'
import ArrivalBoardConverter from '~/converters/ArrivalBoardConverter'
import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Plugin} from "@nuxt/types";

const Api = class implements RejseplanApi {
  axios: NuxtAxiosInstance;
  nobaseUrlAxios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios;
    this.nobaseUrlAxios = axios.create()
  }

  search(query: string): Promise<StopLocation[]> {
    return this.axios.get(`/rejseplan/location?input=${query}&format=json`)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return StopLocationConverter(json)
      })
  }

  closest(coord: Coordinate): Promise<StopLocation[]> {
    return this.axios.get(
      `/rejseplan/stopsNearby?coordX=${coord.getXBit()}&coordY=${coord.getYBit()}&format=json`
    )
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return StopLocationConverter(json)
      })
  }

  station(id: string): Promise<StopLocation> {
    return this.axios.get(`/rejseplan/location?input=${id}&format=json`)
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
    return this.axios.get(url)
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
    return this.axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((data: any) => {
        return ArrivalBoardConverter(data)
      })
  }

  journey(element: Departure): Promise<Journey> {
    const url = `https://webapp.rejseplanen.dk/bin/rest.exe${element.journey}`
    return this.nobaseUrlAxios.get(url)
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
    let baseurl = `/rejseplan/${url}?id=${id}&format=json`
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
}

const RejseplanApi: Plugin = (context, inject) => {
  inject('rejseplanApi', new Api(context.$axios))
}

export default RejseplanApi
