interface DailyForecast {
  dt: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  pop: number
}

export const getTenDayForecast = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenWeatherMap One Call API Error:', errorData)
      // Trả về dữ liệu mặc định nếu có lỗi
      return { list: [] }
    }

    const data = await response.json()
    
    // Định dạng dữ liệu phù hợp với component
    return {
      list: data.daily?.map((day: DailyForecast) => ({
        dt: day.dt,
        temp: {
          day: day.temp.day,
          min: day.temp.min,
          max: day.temp.max,
          night: day.temp.night,
          eve: day.temp.eve,
          morn: day.temp.morn
        },
        weather: day.weather,
        pop: day.pop * 100 // Chuyển đổi từ 0-1 sang 0-100%
      })) || []
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    return { list: [] }
  }
}
