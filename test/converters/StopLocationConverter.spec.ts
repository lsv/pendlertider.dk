import converter from '~/converters/StopLocationConverter'
import { StopLocation } from '~/types'

describe('converters/StopLocationConverter', () => {
  it('can convert json', () => {
    const json = require('./StopLocation.json')

    const output = converter(json)
    expect(output.length).toBe(41)

    let element: StopLocation

    element = output[0]
    expect(element.id).toBe('008600650')
    expect(element.name).toBe('Østerport St.')
    expect(element.x).toBe('12587784')
    expect(element.y).toBe('55692498')
    expect(element.coordinate.longitude).toBe(12.587784)
    expect(element.coordinate.latitude).toBe(55.692498)

    element = output[1]
    expect(element.id).toBe('521000701')
    expect(element.name).toBe('Øster Højst Skole')
    expect(element.x).toBe('9036236')
    expect(element.y).toBe('55000005')
    expect(element.coordinate.longitude).toBe(9.036236)
    expect(element.coordinate.latitude).toBe(55.000005)
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
