import converter from '~/converters/StopLocation'
import { StopLocation } from '~/types'

describe('converters/StopLocation', () => {
  it('can convert json', () => {
    const json = require('./StopLocation.json')

    const output = converter(json)
    expect(output.length).toBe(41)

    const first: StopLocation = output[0]
    expect(first.id).toBe('008600650')
    expect(first.name).toBe('Østerport St.')
    expect(first.x).toBe('12587784')
    expect(first.y).toBe('55692498')
    expect(first.coordinate.longitude).toBe(12.587784)
    expect(first.coordinate.latitude).toBe(55.692498)

    const second: StopLocation = output[1]
    expect(second.id).toBe('521000701')
    expect(second.name).toBe('Øster Højst Skole')
    expect(second.x).toBe('9036236')
    expect(second.y).toBe('55000005')
    expect(second.coordinate.longitude).toBe(9.036236)
    expect(second.coordinate.latitude).toBe(55.000005)
  })

  it('can handle single element', () => {
    const json = require('./StopLocation.single.json')

    const output = converter(json)
    expect(output.length).toBe(1)
  })

  it('will return a empty array if no results', () => {
    const json = require('./StopLocation.empty.json')

    const output = converter(json)
    expect(output.length).toBe(0)
  })

  it('will not add an element if something is missing', () => {
    const json = require('./StopLocation.missing.json')

    const output = converter(json)
    expect(output.length).toBe(0)
  })
})
