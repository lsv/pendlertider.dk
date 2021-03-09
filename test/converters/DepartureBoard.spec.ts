import departures from '~/converters/DepartureBoard'
import { Departure } from '~/types'

describe('converters/StopLocation', () => {
  it('can convert json', () => {
    const json = require('./DepartureBoard.json')

    const output = departures(json)
    expect(output.length).toBe(3)

    const first: Departure = output[0]
    expect(first.name).toBe('Bus 662')
    expect(first.type).toBe('BUS')
    expect(first.stop).toBe('Øster Gejl')
    expect(first.time).toBe('15:46')
    expect(first.date).toBe('09.03.21')
    expect(first.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 15:46')
    expect(first.id).toBe('503002401')
    expect(first.line).toBe('662')
    expect(first.messages).toBe(2)
    expect(first.finalStop).toBe('Lyreskovskolen, Padborgvej')
    expect(first.direction).toBe('Lyreskovskolen, Padborgvej')
    expect(first.journey).toBe(
      '/journeyDetail?ref=572406%2F216961%2F181634%2F99986%2F86%3Fdate%3D09.03.21%26format%3Djson'
    )
  })

  it('will return a empty array if no results', () => {
    const json = require('./DepartureBoard.empty.json')

    const output = departures(json)
    expect(output.length).toBe(0)
  })

  it('will not add an element if something is missing', () => {
    const json = require('./DepartureBoard.missing.json')

    const output = departures(json)
    expect(output.length).toBe(2)
  })
})
