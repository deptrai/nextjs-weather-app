interface HourlyForecast {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

interface CityInfo {
  id: number
  name: string
  coord: {
    lat: number
    lon: number
  }
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  try {
    // Sử dụng forecast API riêng biệt vì One Call API 3.0 không trả về dữ liệu giống hệt
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&cnt=40`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenWeatherMap API Error:', errorData)
      // Trả về dữ liệu mặc định nếu có lỗi
      return {
        list: [],
        city: {
          id: 0,
          name: 'Unknown',
          coord: { lat: parseFloat(lat), lon: parseFloat(lon) },
          country: '',
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0
        }
      }
    }


    const data = await response.json()
    
    // Đảm bảo dữ liệu trả về có đúng định dạng
    if (!data.list || !Array.isArray(data.list)) {
      data.list = []
    }
    
    if (!data.city) {
      data.city = {
        id: 0,
        name: 'Unknown',
        coord: { lat: parseFloat(lat), lon: parseFloat(lon) },
        country: '',
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0
      }
    }
    
    return data
  } catch (error) {
    console.error('Error fetching hourly data:', error)
    // Trả về dữ liệu mặc định nếu có lỗi
    return {
      list: [],
      city: {
        id: 0,
        name: 'Unknown',
        coord: { lat: parseFloat(lat), lon: parseFloat(lon) },
        country: '',
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0
      }
    }
  }
}
