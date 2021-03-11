import Vue from 'vue'
import Axios, { AxiosResponse } from 'axios'
import StopLocationConverter from '~/converters/StopLocationConverter'
import DepartureBoardConverter from '~/converters/DepartureBoardConverter'
import {StopLocation, Api, Departure, Journey, Arrival} from '~/types'
import DateFormatter from "~/converters/DateFormatter";
import {DateTime} from "luxon";
import JourneyDetailConverter from "~/converters/JourneyDetailConverter";
import ArrivalBoardConverter from "~/converters/ArrivalBoardConverter";

const BASEURL = 'http://xmlopen.rejseplanen.dk/bin/rest.exe'

Vue.prototype.$api = new (class implements Api {
  search(query: string): Promise<StopLocation[]> {
    return Axios.get(`${BASEURL}/location?input=${query}&format=json`)
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

  departureBoard(id: string, nexttime: DateTime | null, useTrain: boolean, useMetro: boolean, useBus: boolean): Promise<Departure[]> {
    const url = this.boardUrl('departureBoard', id, nexttime, useTrain, useMetro, useBus)
    return Axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((data: any) => {
        return DepartureBoardConverter(data)
      })
  }

  arrivalBoard(id: string, nexttime: DateTime | null, useTrain: boolean, useMetro: boolean, useBus: boolean): Promise<Arrival[]> {
    const url = this.boardUrl('arrivalBoard', id, nexttime, useTrain, useMetro, useBus)
    return Axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((data: any) => {
        return ArrivalBoardConverter(data)
      })
  }

  journey(element: Departure): Promise<Journey> {
    const url = `http://webapp.rejseplanen.dk/bin/rest.exe${element.journey}`
    // const url = 'http://webapp.rejseplanen.dk/bin//rest.exe/journeyDetail?ref=491526%2F184019%2F170702%2F78492%2F86%3Fdate%3D09.03.21%26format%3Djson'
    return Axios.get(url)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((json: any) => {
        return JourneyDetailConverter(json)
      })
  }

  private boardUrl(url: string, id: string, nexttime: DateTime | null, useTrain: boolean, useMetro: boolean, useBus: boolean): string
  {
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
      baseurl += `&date=${DateFormatter.toRejseplanenDate(nexttime)}&time=${DateFormatter.toRejseplanenTime(nexttime)}`
    }

    return baseurl
  }
})()
