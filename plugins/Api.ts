import Vue from 'vue'
import Axios, { AxiosResponse } from 'axios'
import StopLocationConverter from '~/converters/StopLocation'
import DepartureBoardConverter from '~/converters/DepartureBoard'
import { Api, Departure, StopLocation } from '~/types'

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

  departureBoard(id: string): Promise<Departure[]> {
    return Axios.get(`${BASEURL}/departureBoard?id=${id}&format=json`)
      .then((data: AxiosResponse) => {
        return data.data
      })
      .then((data: any) => {
        return DepartureBoardConverter(data)
      })
  }
})()
