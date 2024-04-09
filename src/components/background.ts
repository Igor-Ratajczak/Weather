export function loadBG(data: unknown) {
  if (typeof data === 'object' && data !== null && 'icon' in data && 'precipitation' in data) {
    const value = data.icon
    let url: string = ''
    switch (value) {
      case 'rain':
      case 'rainshowers_day':
      case 'rainshowers_night':
      case 'rainshowers_polartwilight':
      case 'lightrain':
      case 'lightrainshowers_day':
      case 'lightrainshowers_night':
      case 'lightrainshowers_polartwilight':
        url = './img/bg/rain.mp4'
        break
      case 'heavyrain':
      case 'heavyrainshowers_day':
      case 'heavyrainshowers_night':
      case 'heavyrainshowers_polartwilight':
        url = './img/bg/heavy_rain.mp4'
        break
      case 'partlycloudy_day':
      case 'partlycloudy_night':
      case 'partlycloudy_polartwilight':
        url = './img/bg/partly_cloudy.mp4'
        break
      case 'cloudy':
        url = './img/bg/cloudy.mp4'
        break
      case 'clearsky_day':
      case 'clearsky_polartwilight':
        url = './img/bg/clear_sky.mp4'
        break
      case 'clearsky_night':
        url = './img/bg/clear_sky_night.mp4'
        break
      case 'fair_day':
      case 'fair_night':
      case 'fair_polartwilight':
        url = './img/bg/fair_sky.mp4'
        break
      case 'sleet':
      case 'sleetshowers_day':
      case 'sleetshowers_night':
      case 'sleetshowers_polartwilight':
      case 'lightsleet':
      case 'lightsleetshowers_day':
      case 'lightsleetshowers_night':
      case 'lightsleetshowers_polartwilight':
      case 'heavysleet':
      case 'heavysleetshowers_day':
      case 'heavysleetshowers_night':
      case 'heavysleetshowers_polartwilight':
        url = './img/bg/sleet.mp4'
        break
      case 'fog':
        url = './img/bg/fog.mp4'
        break
      case 'lightsnow':
      case 'lightsnowshowers_day':
      case 'lightsnowshowers_night':
      case 'lightsnowshowers_polartwilight':
      case 'snow':
      case 'snowshowers_day':
      case 'snowshowers_night':
      case 'snowshowers_polartwilight':
        url = './img/bg/snow.mp4'
        break
      case 'heavysnow':
      case 'heavysnowshowers_day':
      case 'heavysnowshowers_night':
      case 'heavysnowshowers_polartwilight':
        url = './img/bg/heavy_snow.mp4'
        break
      case 'heavyrainandthunder':
      case 'heavyrainshowersandthunder_day':
      case 'heavyrainshowersandthunder_night':
      case 'heavyrainshowersandthunder_polartwilight':
      case 'heavysleetandthunder':
      case 'heavysleetshowersandthunder_day':
      case 'heavysleetshowersandthunder_night':
      case 'heavysleetshowersandthunder_polartwilight':
      case 'heavysnowandthunder':
      case 'heavysnowshowersandthunder_day':
      case 'heavysnowshowersandthunder_night':
      case 'heavysnowshowersandthunder_polartwilight':
      case 'lightrainandthunder':
      case 'lightrainshowersandthunder_day':
      case 'lightrainshowersandthunder_night':
      case 'lightrainshowersandthunder_polartwilight':
      case 'lightsleetandthunder':
      case 'lightsnowandthunder':
      case 'lightssleetshowersandthunder_day':
      case 'lightssleetshowersandthunder_night':
      case 'lightssleetshowersandthunder_polartwilight':
      case 'lightssnowshowersandthunder_day':
      case 'lightssnowshowersandthunder_night':
      case 'lightssnowshowersandthunder_polartwilight':
      case 'rainandthunder':
      case 'rainshowersandthunder_day':
      case 'rainshowersandthunder_night':
      case 'rainshowersandthunder_polartwilight':
      case 'sleetandthunder':
      case 'sleetshowersandthunder_day':
      case 'sleetshowersandthunder_night':
      case 'sleetshowersandthunder_polartwilight':
      case 'snowandthunder':
      case 'snowshowersandthunder_day':
      case 'snowshowersandthunder_night':
      case 'snowshowersandthunder_polartwilight':
        url = './img/bg/thunder.mp4'
        break
      default:
        break
    }
    const video = document.querySelector('video')
    video.children[0].setAttribute('src', url)
    video.setAttribute('autoplay', '')
    video.setAttribute('muted', '')
    video.load()
    resizeVideo()
  } else {
    console.error('Invalid data object or missing "icon" property.')
  }
}
export function resizeVideo() {
  const video = document.getElementById('video')
  const vid_w_orig = 1280
  const vid_h_orig = 720
  window.addEventListener('resize', function () {
    const container_w = video.parentElement.clientWidth
    const container_h = video.parentElement.clientHeight

    // use largest scale factor of horizontal/vertical
    const scale_w = container_w / vid_w_orig
    const scale_h = container_h / vid_h_orig
    const scale = scale_w > scale_h ? scale_w : scale_h

    // scale the video
    video.setAttribute('width', String(scale * vid_w_orig))
    video.setAttribute('height', String(scale * vid_h_orig))
  })
  window.dispatchEvent(new Event('resize'))
}
