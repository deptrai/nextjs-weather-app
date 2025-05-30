import { ForecastData, TenDayForecastData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { convertToDate } from "@/lib/dateUtils"
import { TemperatureRange } from "../ui/temperature-range"
import IconComponent from "../ui/icon-component"
import { Separator } from "../ui/separator"

interface TenDayForecastProps {
  data: TenDayForecastData
  timezone?: number
}

export default function TenDayForecast({ data, timezone = 0 }: TenDayForecastProps) {
  if (!data?.list?.length) {
    return (
      <Card className="h-fit shrink-0">
        <CardHeader>
          <CardTitle>10-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">No forecast data available</p>
        </CardContent>
      </Card>
    )
  }

  const temperatures = data.list.map((item) => item.temp)
  const minTemperature = Math.min(...temperatures.map((temp) => temp.min))
  const maxTemperature = Math.max(...temperatures.map((temp) => temp.max))

  // Hàm chuyển đổi timestamp thành tên thứ trong tuần
  const getDayOfWeek = (timestamp: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const date = new Date(timestamp * 1000)
    return days[date.getDay()]
  }

  return (
    <Card className="h-fit shrink-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7 13.7H15.7M15.7 16.7H15.7M12 13.7H12M12 16.7H12M8.3 13.7H8.3M8.3 16.7H8.3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>10-Day Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        {data.list.slice(0, 10).map((item, i) => {
          const date = new Date(item.dt * 1000)
          const dayOfWeek = getDayOfWeek(item.dt)
          const dayOfMonth = date.getDate()
          const month = date.toLocaleString('default', { month: 'short' })
          
          return (
            <div key={`${item.dt}-${i}`}>
              <div className="flex items-center justify-between py-2">
                <div className="flex w-24 flex-col">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {i === 0 ? 'Today' : dayOfWeek}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {dayOfMonth} {month}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <IconComponent
                    weatherCode={item.weather[0].id}
                    className="h-8 w-8"
                    x={item.weather[0].icon?.endsWith('d') ? 'd' : 'n'}
                  />
                </div>
                
                <div className="flex items-center justify-end gap-2">
                  <span className="w-8 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                    {Math.round(item.temp.min)}°
                  </span>
                  <div className="w-24">
                    <TemperatureRange
                      min={minTemperature}
                      max={maxTemperature}
                      value={[item.temp.min, item.temp.max]}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-medium">
                    {Math.round(item.temp.max)}°
                  </span>
                </div>
              </div>
              {i < 9 && <Separator className="my-1" />}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
