export const getGeoPoints = geolocation => {
  const points = geolocation?.value || geolocation

  if (Array.isArray(points)) return points
  if (points?.lat && points?.lng) return [points.lat, points.lng]

  return null
}
