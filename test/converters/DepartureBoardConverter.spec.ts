import departures from '~/converters/DepartureBoardConverter'
import { Departure } from '~/types'

describe('converters/DepartureBoardConverter', () => {
  it('can convert json', () => {
    const json = require('./DepartureBoard.json')
    let departure: Departure

    const output = departures(json)
    expect(output.length).toBe(5)

    departure = output[0]
    expect(departure.name).toBe('Bus 662')
    expect(departure.type).toBe('BUS')
    expect(departure.stop).toBe('Øster Gejl')
    expect(departure.trainDate.time).toBe('15:46')
    expect(departure.trainDate.date).toBe('09.03.21')
    expect(departure.trainDate.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 15:46')
    expect(departure.id).toBe('572406002169610018163400999860086')
    expect(departure.line).toBe('662')
    expect(departure.messages).toBe(2)
    expect(departure.finalStop).toBe('Lyreskovskolen, Padborgvej')
    expect(departure.direction).toBe('Lyreskovskolen, Padborgvej')
    expect(departure.trainDate.timeChanged).toBe(false)
    expect(departure.trainDate.rtTime).toBe(undefined)
    expect(departure.trainDate.rtDate).toBe(undefined)
    expect(departure.trainDate.dateChanged).toBe(false)
    expect(departure.trainDate.datetimeChanged).toBe(false)
    expect(departure.trainDate.rtDatetime).toBe(undefined)
    expect(departure.journey).toBe(
      '/journeyDetail?ref=572406%2F216961%2F181634%2F99986%2F86%3Fdate%3D09.03.21%26format%3Djson'
    )

    departure = output[1]
    expect(departure.name).toBe('Re 1400')
    expect(departure.type).toBe('REG')
    expect(departure.stop).toBe('Østerport St.')
    expect(departure.trainDate.time).toBe('20:46')
    expect(departure.trainDate.date).toBe('09.03.21')
    expect(departure.trainDate.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 20:46')
    expect(departure.messages).toBe(2)
    expect(departure.finalStop).toBe('CPH Lufthavn')
    expect(departure.direction).toBe('CPH Lufthavn')
    expect(departure.trainDate.track).toBe('3')
    expect(departure.trainDate.rtTrack).toBe('3')
    expect(departure.trainDate.trackChanged).toBe(false)
    expect(departure.trainDate.timeChanged).toBe(true)
    expect(departure.trainDate.rtTime).toBe('20:48')
    expect(departure.trainDate.dateChanged).toBe(false)
    expect(departure.trainDate.datetimeChanged).toBe(true)
    expect(departure.trainDate.rtDatetime?.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 20:48')
    expect(departure.journey).toBe(
      '/journeyDetail?ref=543519%2F184655%2F300818%2F30764%2F86%3Fdate%3D09.03.21%26format%3Djson'
    )

    departure = output[2]
    expect(departure.name).toBe('C')
    expect(departure.trainDate.track).toBe('6')
    expect(departure.trainDate.rtTrack).toBe('6')
    expect(departure.trainDate.trackChanged).toBe(false)
  })

  it('will return a empty array if no results', () => {
    const json = require('./DepartureBoard.empty.json')

    const output = departures(json)
    expect(output.length).toBe(0)
  })

  it('will not add an element if something is missing', () => {
    const json = require('./DepartureBoard.missing.json')

    const output = departures(json)
    expect(output.length).toBe(1)
  })
})
