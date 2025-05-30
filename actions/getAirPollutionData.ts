interface AirPollutionData {
  list: Array<{
    main: {
      aqi: number
    }
    components: {
      co: number
      no: number
      no2: number
      o3: number
      so2: number
      pm2_5: number
      pm10: number
      nh3: number
    }
    dt: number
  }>
}

export const getAirPollutionData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  try {
    // Sử dụng Air Pollution API riêng biệt vì One Call API 3.0 không bao gồm dữ liệu này
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenWeatherMap Air Pollution API Error:', errorData)
      // Trả về dữ liệu mặc định nếu có lỗi
      return {
        list: [{
          main: { aqi: 1 }, // AQI từ 1-5
          components: {
            co: 0,
            no: 0,
            no2: 0,
            o3: 0,
            so2: 0,
            pm2_5: 0,
            pm10: 0,
            nh3: 0
          },
          dt: Math.floor(Date.now() / 1000)
        }]
      }
    }

    const data: AirPollutionData = await response.json()
    
    // Đảm bảo luôn có ít nhất một mục trong mảng list
    if (!data.list || data.list.length === 0) {
      data.list = [{
        main: { aqi: 1 },
        components: {
          co: 0,
          no: 0,
          no2: 0,
          o3: 0,
          so2: 0,
          pm2_5: 0,
          pm10: 0,
          nh3: 0
        },
        dt: Math.floor(Date.now() / 1000)
      }]
    }
    
    return data
  } catch (error) {
    console.error('Error fetching air pollution data:', error)
    // Trả về dữ liệu mặc định nếu có lỗi
    return {
      list: [{
        main: { aqi: 1 },
        components: {
          co: 0,
          no: 0,
          no2: 0,
          o3: 0,
          so2: 0,
          pm2_5: 0,
          pm10: 0,
          nh3: 0
        },
        dt: Math.floor(Date.now() / 1000)
      }]
    }
  }
}
