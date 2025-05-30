export const getUVData = async ({ lat, lon }: { lat: string; lon: string }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenWeatherMap UV Index API Error:', errorData)
      // Trả về dữ liệu mặc định nếu có lỗi
      return {
        current: { uvi: 0 },
        daily: { uv_index_max: [0, 0, 0, 0, 0] }
      }
    }

    const data = await response.json()
    
    // Định dạng dữ liệu phù hợp với component
    return {
      current: {
        uvi: data.current?.uvi || 0
      },
      daily: {
        uv_index_max: data.daily?.map((day: any) => day.uvi || 0).slice(0, 5) || [0, 0, 0, 0, 0]
      }
    }
  } catch (error) {
    console.error('Error fetching UV index data:', error)
    throw error
  }
}
