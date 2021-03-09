import { GeolocationPlugin } from 'vue-geolocation-api/types'
import { Coordinate } from '~/types'

export type Distance = {
  km: number
}

export default function (
  coordinate: Coordinate,
  position: GeolocationPlugin.PositionCoords | null
): Distance | null {
  function getDistanceFromLatLonInMeters(
    latitudeSource: number,
    longitudeSource: number,
    latitudeTarget: number,
    longitudeTarget: number
  ): number {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(latitudeTarget - latitudeSource) // deg2rad below
    const dLon = deg2rad(longitudeTarget - longitudeSource)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(latitudeSource)) *
        Math.cos(deg2rad(latitudeTarget)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return parseFloat(d.toFixed(2))
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  if (!position) {
    return null
  }

  return {
    km: getDistanceFromLatLonInMeters(
      coordinate.latitude,
      coordinate.longitude,
      position.latitude,
      position.longitude
    ),
  }
}
