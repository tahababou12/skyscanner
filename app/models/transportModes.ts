export interface TransportMode {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const transportModes: TransportMode[] = [
  {
    id: "taxi",
    name: "Taxi",
    icon: "🚕",
    description: "Door-to-door service with a licensed taxi"
  },
  {
    id: "uber",
    name: "Uber",
    icon: "🚗",
    description: "Ridesharing service with Uber"
  },
  {
    id: "lyft",
    name: "Lyft",
    icon: "🚙",
    description: "Ridesharing service with Lyft"
  },
  {
    id: "subway",
    name: "Subway",
    icon: "🚇",
    description: "Underground metro/subway service"
  },
  {
    id: "bus",
    name: "Bus",
    icon: "🚌",
    description: "Public bus service"
  },
  {
    id: "train",
    name: "Train",
    icon: "🚆",
    description: "Train service between stations"
  },
  {
    id: "tram",
    name: "Tram",
    icon: "🚊",
    description: "Light rail/tram service"
  },
  {
    id: "ferry",
    name: "Ferry",
    icon: "⛴️",
    description: "Water transport service"
  },
  {
    id: "bike",
    name: "Bike Share",
    icon: "🚲",
    description: "Bike sharing service"
  },
  {
    id: "scooter",
    name: "Scooter",
    icon: "🛴",
    description: "Electric scooter rental"
  },
  {
    id: "walk",
    name: "Walking",
    icon: "🚶",
    description: "Walking directions"
  }
];

export function getTransportModeById(id: string): TransportMode | undefined {
  return transportModes.find(mode => mode.id === id);
}
