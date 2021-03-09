import DistanceToCoordinate from '~/converters/DistanceToCoordinate'

describe('DistanceToCoordinate', () => {
  it('will return null if position is not set', () => {
    const source = {
      latitude: 0,
      longitude: 0,
    }
    const distance = DistanceToCoordinate(source, null)
    expect(distance).toBe(null)
  })
  it('can calculate the distance as zero', () => {
    const source = {
      latitude: 0,
      longitude: 0,
    }

    const target = {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    }

    const distance = DistanceToCoordinate(source, target)
    expect(typeof distance?.km).toBe('number')
    expect(distance?.km).toBe(0)
  })
})
