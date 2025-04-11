// Sample data for locations within cities
export interface Location {
  id: string;
  name: string;
  city: string;
  type: 'airport' | 'train_station' | 'bus_station' | 'metro_station' | 'landmark';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const locations: Location[] = [
  {
    id: "nyc-jfk",
    name: "JFK Airport",
    city: "New York",
    type: "airport",
    coordinates: { lat: 40.6413, lng: -73.7781 }
  },
  {
    id: "nyc-lga",
    name: "LaGuardia Airport",
    city: "New York",
    type: "airport",
    coordinates: { lat: 40.7769, lng: -73.8740 }
  },
  {
    id: "nyc-ewr",
    name: "Newark Liberty Airport",
    city: "New York",
    type: "airport",
    coordinates: { lat: 40.6895, lng: -74.1745 }
  },
  {
    id: "nyc-gct",
    name: "Grand Central Terminal",
    city: "New York",
    type: "train_station",
    coordinates: { lat: 40.7527, lng: -73.9772 }
  },
  {
    id: "nyc-ps",
    name: "Penn Station",
    city: "New York",
    type: "train_station",
    coordinates: { lat: 40.7505, lng: -73.9935 }
  },
  {
    id: "nyc-ts",
    name: "Times Square",
    city: "New York",
    type: "landmark",
    coordinates: { lat: 40.7580, lng: -73.9855 }
  },
  {
    id: "nyc-cp",
    name: "Central Park",
    city: "New York",
    type: "landmark",
    coordinates: { lat: 40.7812, lng: -73.9665 }
  },
  {
    id: "sf-sfo",
    name: "San Francisco International Airport",
    city: "San Francisco",
    type: "airport",
    coordinates: { lat: 37.6213, lng: -122.3790 }
  },
  {
    id: "sf-oak",
    name: "Oakland International Airport",
    city: "San Francisco",
    type: "airport",
    coordinates: { lat: 37.7214, lng: -122.2208 }
  },
  {
    id: "sf-sjc",
    name: "San Jose International Airport",
    city: "San Francisco",
    type: "airport",
    coordinates: { lat: 37.3639, lng: -121.9289 }
  },
  {
    id: "sf-gg",
    name: "Golden Gate Bridge",
    city: "San Francisco",
    type: "landmark",
    coordinates: { lat: 37.8199, lng: -122.4783 }
  },
  {
    id: "sf-fwharf",
    name: "Fisherman's Wharf",
    city: "San Francisco",
    type: "landmark",
    coordinates: { lat: 37.8080, lng: -122.4177 }
  },
  {
    id: "lon-lhr",
    name: "Heathrow Airport",
    city: "London",
    type: "airport",
    coordinates: { lat: 51.4700, lng: -0.4543 }
  },
  {
    id: "lon-lgw",
    name: "Gatwick Airport",
    city: "London",
    type: "airport",
    coordinates: { lat: 51.1537, lng: -0.1821 }
  },
  {
    id: "lon-stp",
    name: "St Pancras International",
    city: "London",
    type: "train_station",
    coordinates: { lat: 51.5320, lng: -0.1263 }
  },
  {
    id: "lon-vic",
    name: "Victoria Station",
    city: "London",
    type: "train_station",
    coordinates: { lat: 51.4952, lng: -0.1441 }
  },
  {
    id: "lon-eye",
    name: "London Eye",
    city: "London",
    type: "landmark",
    coordinates: { lat: 51.5033, lng: -0.1195 }
  },
  {
    id: "lon-tower",
    name: "Tower of London",
    city: "London",
    type: "landmark",
    coordinates: { lat: 51.5081, lng: -0.0759 }
  }
];

export function getLocationsByCity(city: string): Location[] {
  return locations.filter(location => location.city.toLowerCase() === city.toLowerCase());
}

export function getLocationById(id: string): Location | undefined {
  return locations.find(location => location.id === id);
}

export function getAllCities(): string[] {
  const cities = new Set(locations.map(location => location.city));
  return Array.from(cities);
}
