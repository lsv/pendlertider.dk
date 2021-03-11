import arrivals from '~/converters/ArrivalBoardConverter'
import { Arrival } from '~/types'

describe('converters/ArrivalBoardConverter', () => {
  it('can convert json', () => {
    const json = require('./ArrivalBoard.json')
    let arrival: Arrival

    const output = arrivals(json)
    expect(output.length).toBe(5)

    arrival = output[0]
    expect(arrival.name).toBe('Bus 662')
    expect(arrival.type).toBe('BUS')
    expect(arrival.stop).toBe('Øster Gejl')
    expect(arrival.time.time).toBe('15:46')
    expect(arrival.time.date).toBe('09.03.21')
    expect(arrival.time.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 15:46')
    expect(arrival.id).toBe('572406002169610018163400999860086')
    expect(arrival.line).toBe('662')
    expect(arrival.messages).toBe(2)
    expect(arrival.origin).toBe('Lyreskovskolen, Padborgvej')
    expect(arrival.time.changed).toBe(false)
    expect(arrival.time.rtTime).toBe(undefined)
    expect(arrival.time.rtDate).toBe(undefined)
    expect(arrival.time.rtDatetime).toBe(undefined)
    expect(arrival.cancelled).toBe(false)
    expect(arrival.journey).toBe(
      '/journeyDetail?ref=572406%2F216961%2F181634%2F99986%2F86%3Fdate%3D09.03.21%26format%3Djson'
    )

    arrival = output[1]
    expect(arrival.name).toBe('Re 1400')
    expect(arrival.type).toBe('REG')
    expect(arrival.stop).toBe('Østerport St.')
    expect(arrival.time.time).toBe('20:46')
    expect(arrival.time.date).toBe('09.03.21')
    expect(arrival.time.datetime.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 20:46')
    expect(arrival.messages).toBe(2)
    expect(arrival.origin).toBe('CPH Lufthavn')
    expect(arrival.track?.track).toBe('3')
    expect(arrival.track?.rtTrack).toBe('4')
    expect(arrival.track?.changed).toBe(true)
    expect(arrival.time.rtTime).toBe('20:48')
    expect(arrival.time.changed).toBe(true)
    expect(arrival.time.rtDatetime?.toFormat('yyyy-MM-dd HH:mm')).toBe('2021-03-09 20:48')
    expect(arrival.journey).toBe(
      '/journeyDetail?ref=543519%2F184655%2F300818%2F30764%2F86%3Fdate%3D09.03.21%26format%3Djson'
    )

    arrival = output[2]
    expect(arrival.name).toBe('C')
    expect(arrival.track?.track).toBe('6')
    expect(arrival.track?.rtTrack).toBe('6')
    expect(arrival.track?.changed).toBe(false)
  })

  it('will return a empty array if no results', () => {
    const json = require('./ArrivalBoard.empty.json')

    const output = arrivals(json)
    expect(output.length).toBe(0)
  })

  it('will not add an element if something is missing', () => {
    const json = require('./ArrivalBoard.missing.json')

    const output = arrivals(json)
    expect(output.length).toBe(1)
  })
})
