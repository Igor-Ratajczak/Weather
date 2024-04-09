export async function fetchData(lat, lon) {
  lat = lat.substring(0, 5)
  lon = lon.substring(0, 5)
  let url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`
  try {
    let res = await fetch(url)
    let finalnyRes = await res.json()
    let data = JSON.stringify(finalnyRes)
    await localStorage.setItem('data', data)
    return finalnyRes.properties
  } catch {
    let data = localStorage.getItem('data')
    let result = JSON.parse(data)
    return result.properties
  }
}
