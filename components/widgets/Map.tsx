"use client"

import { useEffect, useMemo, useState } from "react"
import ReactMapGL, { ViewState } from "react-map-gl"
import { Card } from "../ui/card"
import { useTheme } from "next-themes"
import { mapboxConfig } from "@/lib/mapbox"
import { DEFAULT_LOCATION } from "@/lib/config"
import { Layers } from "lucide-react"

/**
 * Map component that displays an interactive map using Mapbox GL
 * @returns {JSX.Element} Map component
 */
export default function Map() {
  const { theme } = useTheme()
  const [mapError, setMapError] = useState<string | null>(null)
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: parseFloat(DEFAULT_LOCATION.coord.lat),
    longitude: parseFloat(DEFAULT_LOCATION.coord.lon),
    zoom: 10,
  })

  // Determine map theme based on system/theme preference
  const MapTheme = useMemo(() => {
    if (typeof window === 'undefined') return 'light'
    
    return theme === "system"
      ? window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme || 'light'
  }, [theme])

  // Check for required Mapbox token
  useEffect(() => {
    if (!mapboxConfig.accessToken) {
      setMapError('Mapbox access token is not configured. Please check your .env.local file.')
    }
  }, [])

  // Handle map loading error
  const handleMapError = () => {
    setMapError('Failed to load the map. Please check your internet connection and try again.')
  }

  // Render error state if there's an issue
  if (mapError) {
    return (
      <Card className="h-[500px] w-full flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Lỗi tải bản đồ</h3>
          <p className="text-sm text-muted-foreground">{mapError}</p>
          <p className="text-xs mt-2">Vui lòng kiểm tra cấu hình Mapbox token trong file .env.local</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-[500px] w-full overflow-hidden relative">
      {/* Map theme selector */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <div className="bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-md">
          <div className="flex items-center space-x-2 text-sm">
            <Layers className="h-4 w-4" />
            <span>Chế độ xem</span>
          </div>
          <select 
            className="mt-1 w-full bg-transparent text-sm border rounded p-1"
            value={MapTheme}
            onChange={(e) => {
              // Theme change will be handled by next-themes
            }}
          >
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
          </select>
        </div>
      </div>
      
      {/* Interactive Map */}
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxConfig.accessToken}
        mapStyle={mapboxConfig.style[MapTheme as keyof typeof mapboxConfig.style]}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        reuseMaps
        onError={handleMapError}
      >
        {/* Current location marker */}
        <div 
          className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer'
          }}
        />
        
        {/* Weather layer info */}
        <div className="absolute bottom-4 left-4 bg-background/80 p-3 rounded-md shadow-md text-xs max-w-[250px] backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Layers className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium">Bản đồ thời tiết</h3>
          </div>
          <p className="text-muted-foreground">Tính năng hiển thị thời tiết tạm thời bị vô hiệu hóa do thiếu API key OpenWeatherMap.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Để bật tính năng này, vui lòng thêm <code className="bg-muted px-1 rounded">NEXT_PUBLIC_OPEN_WEATHER_API_KEY</code> vào file <code className="bg-muted px-1 rounded">.env.local</code>
          </p>
        </div>
        
        {/* Map controls help */}
        <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-md shadow-md text-xs backdrop-blur-sm">
          <p>🖱️ Kéo để di chuyển bản đồ</p>
          <p>🖱️ Cuộn để phóng to/thu nhỏ</p>
        </div>
      </ReactMapGL>
    </Card>
  )
}
