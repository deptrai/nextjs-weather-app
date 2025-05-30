export const mapboxConfig = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
  style: {
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11'
  },
  defaultViewport: {
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 10
  }
} as const;
