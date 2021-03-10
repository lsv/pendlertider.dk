import JourneyDetailConverter from "~/converters/JourneyDetailConverter";
import {JourneyStop} from "~/types";

describe('converters/JourneyDetailConverter', () => {
  it('can convert json', () => {
    const json = require('./JourneyDetail.json')
    const output = JourneyDetailConverter(json)

    expect(output.stops.length).toBe(72)
    expect(output.messages.length).toBe(1)
  })

  it('can convert multi messages', () => {
    const json = require('./JourneyDetail.multimessage.json')
    const output = JourneyDetailConverter(json)
    expect(output.messages.length).toBe(2)
  })

  it('can convert dates', () => {
    const json = require('./JourneyDetail.dates.json')
    const output = JourneyDetailConverter(json)
    let stop: JourneyStop

    stop = output.stops[0]
    expect(stop.name).toBe('Solrød Strand St.')
    expect(stop.routeIdx).toBe(0)
    expect(stop.departure).not.toBe(undefined)
    expect(stop.departure?.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 02:14')
    expect(stop.departure?.rtDatetime?.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 02:14')
    expect(stop.departure?.changed).toBe(false)
    expect(stop.arrival).toBe(undefined)
  })

  it('can convert stops to ts', () => {
    const json = require('./JourneyDetail.json')
    const output = JourneyDetailConverter(json)
    let stop: JourneyStop

    stop = output.stops[0]
    expect(stop.name).toBe('Solrød Strand St.')
    expect(stop.routeIdx).toBe(0)
    expect(stop.departure).not.toBe(undefined)
    expect(stop.departure?.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 02:14')
    expect(stop.departure?.changed).toBe(false)
    expect(stop.arrival).toBe(undefined)

    stop = output.stops[1]
    expect(stop.name).toBe('Østre Strandvej (Solrød Strandvej)')
    expect(stop.routeIdx).toBe(1)
    expect(stop.departure?.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 02:15')
    expect(stop.departure?.changed).toBe(false)
    expect(stop.arrival?.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 02:15')
    expect(stop.arrival?.changed).toBe(false)

    stop = output.stops[71]
    expect(stop.name).toBe('Rådhuspladsen St. (H.C. Andersens Boulevard)')
    expect(stop.routeIdx).toBe(71)
    expect(stop.arrival?.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 03:19')
    expect(stop.arrival?.changed).toBe(true)
    expect(stop.arrival?.rtDatetime?.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-10 03:16')
    expect(stop.departure).toBe(undefined)
  })
})
