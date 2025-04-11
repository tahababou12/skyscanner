import { getLocationById } from "./locations";
import { getTransportModeById } from "./transportModes";

export interface Route {
  id: string;
  fromId: string;
  toId: string;
  transportModeId: string;
  duration: number; // in minutes
  price: number; // in USD
  departureTime: string;
  arrivalTime: string;
  distance: number; // in km
  co2Emissions: number; // in kg
}

// Generate a sample route between two locations
export function generateRoute(
  fromId: string,
  toId: string,
  transportModeId: string,
  departureTime: string
): Route | null {
  const fromLocation = getLocationById(fromId);
  const toLocation = getLocationById(toId);
  const transportMode = getTransportModeById(transportModeId);

  if (!fromLocation || !toLocation || !transportMode) {
    return null;
  }

  // Calculate distance using Haversine formula
  const distance = calculateDistance(
    fromLocation.coordinates.lat,
    fromLocation.coordinates.lng,
    toLocation.coordinates.lat,
    toLocation.coordinates.lng
  );

  // Calculate duration based on transport mode and distance
  const duration = calculateDuration(distance, transportModeId);

  // Calculate price based on transport mode and distance
  const price = calculatePrice(distance, transportModeId);

  // Calculate arrival time
  const arrivalTime = calculateArrivalTime(departureTime, duration);

  // Calculate CO2 emissions
  const co2Emissions = calculateCO2Emissions(distance, transportModeId);

  return {
    id: `${fromId}-${toId}-${transportModeId}-${departureTime}`,
    fromId,
    toId,
    transportModeId,
    duration,
    price,
    departureTime,
    arrivalTime,
    distance,
    co2Emissions
  };
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Calculate duration based on transport mode and distance
function calculateDuration(distance: number, transportModeId: string): number {
  const speeds: Record<string, number> = {
    taxi: 30, // km/h
    uber: 30,
    lyft: 30,
    subway: 35,
    bus: 20,
    train: 60,
    tram: 25,
    ferry: 20,
    bike: 15,
    scooter: 15,
    walk: 5
  };

  const speed = speeds[transportModeId] || 30;
  const durationHours = distance / speed;
  const durationMinutes = Math.round(durationHours * 60);
  
  // Add some waiting time for public transport
  if (['subway', 'bus', 'train', 'tram', 'ferry'].includes(transportModeId)) {
    return durationMinutes + Math.floor(Math.random() * 10) + 5; // Add 5-15 minutes waiting time
  }
  
  return Math.max(durationMinutes, 5); // Minimum 5 minutes
}

// Calculate price based on transport mode and distance
function calculatePrice(distance: number, transportModeId: string): number {
  const basePrices: Record<string, number> = {
    taxi: 5 + (distance * 2),
    uber: 4 + (distance * 1.8),
    lyft: 4 + (distance * 1.7),
    subway: 2.75,
    bus: 2.5,
    train: 3 + (distance * 0.5),
    tram: 2.5,
    ferry: 4 + (distance * 0.3),
    bike: 2 + (distance * 0.1),
    scooter: 1 + (distance * 0.2),
    walk: 0
  };

  const price = basePrices[transportModeId] || 5;
  return Math.round(price * 100) / 100; // Round to 2 decimal places
}

// Calculate arrival time based on departure time and duration
function calculateArrivalTime(departureTime: string, durationMinutes: number): string {
  const departureDate = new Date(`2023-01-01T${departureTime}:00`);
  const arrivalDate = new Date(departureDate.getTime() + durationMinutes * 60000);
  return arrivalDate.toTimeString().substring(0, 5);
}

// Calculate CO2 emissions based on distance and transport mode
function calculateCO2Emissions(distance: number, transportModeId: string): number {
  const emissionFactors: Record<string, number> = {
    taxi: 0.15, // kg CO2 per km
    uber: 0.15,
    lyft: 0.15,
    subway: 0.03,
    bus: 0.08,
    train: 0.04,
    tram: 0.03,
    ferry: 0.12,
    bike: 0,
    scooter: 0.02,
    walk: 0
  };

  const factor = emissionFactors[transportModeId] || 0.15;
  return Math.round(distance * factor * 100) / 100; // Round to 2 decimal places
}

// Generate multiple routes for a search
export function searchRoutes(
  fromId: string,
  toId: string,
  departureTime: string
): Route[] {
  const routes: Route[] = [];

  // Generate routes for all transport modes
  for (const transportModeId of [
    "taxi", "uber", "lyft", "subway", "bus", "train", "tram", "ferry", "bike", "scooter", "walk"
  ]) {
    const route = generateRoute(fromId, toId, transportModeId, departureTime);
    if (route) {
      routes.push(route);
    }
  }

  // Sort routes by duration
  return routes.sort((a, b) => a.duration - b.duration);
}
