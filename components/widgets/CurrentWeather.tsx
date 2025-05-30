import { Card } from "@/components/ui/card"
import { City, OpenWeatherData } from "@/lib/types"
import Clock from "../ui/clock"
import { convertToDate } from "@/lib/dateUtils"
import IconComponent from "../ui/icon-component"

interface CurrentWeatherProps {
  data: OpenWeatherData
  city: City
}

export default function CurrentWeather({ data, city }: CurrentWeatherProps) {
  const initial = new Date()
  // Sử dụng pod từ dữ liệu thời tiết nếu có, nếu không sử dụng mặc định là 'd' (ban ngày)
  const pod = data.sys?.pod || 'd';

  return (
    <Card className="relative flex h-fit w-full shrink-0 flex-col justify-between overflow-hidden md:h-[25rem] p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-10 dark:from-blue-900 dark:to-blue-700" />
      <div className="relative z-10">
        <div className="flex justify-between text-lg font-semibold">
          <span>{convertToDate(city.timezone, data.dt, "long")}</span>
          <Clock initial={initial} timezone={city.timezone} />
        </div>
        <div className="text-md mt-2 flex items-center font-bold">
          <span>{city.name}, {city.country}</span>
          <i className="ml-1">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-none stroke-current"
            >
              <path
                d="M7.4 6.32l8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-1.01-3.03-3.03-1.01c-5.71-1.9-5.71-5.01 0-6.92z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.11 13.65l3.58-3.59"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        <div className="flex items-center justify-center">
          <IconComponent
            weatherCode={data.weather[0].id}
            x={pod}
            className="h-24 w-24"
          />
          <div className="text-7xl font-bold ml-2">
            {Math.round(data.main.temp)}°
          </div>
        </div>
        <div className="text-xl font-semibold mt-2 text-center">
          {data.weather[0].description}
        </div>
        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <span className="font-medium">Cao:</span>
            <span className="ml-1">{Math.round(data.main.temp_max)}°</span>
          </div>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center">
            <span className="font-medium">Thấp:</span>
            <span className="ml-1">{Math.round(data.main.temp_min)}°</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Gió</span>
          <span className="font-medium">{data.wind.speed} m/s</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Độ ẩm</span>
          <span className="font-medium">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Áp suất</span>
          <span className="font-medium">{data.main.pressure} hPa</span>
        </div>
      </div>
    </Card>
  )
}
