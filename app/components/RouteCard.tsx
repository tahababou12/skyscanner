import { Route } from "~/models/routes";
import { getLocationById } from "~/models/locations";
import { getTransportModeById } from "~/models/transportModes";

interface RouteCardProps {
  route: Route;
}

export default function RouteCard({ route }: RouteCardProps) {
  const fromLocation = getLocationById(route.fromId);
  const toLocation = getLocationById(route.toId);
  const transportMode = getTransportModeById(route.transportModeId);

  if (!fromLocation || !toLocation || !transportMode) {
    return null;
  }

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="text-2xl mr-3">{transportMode.icon}</div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{transportMode.name}</h3>
            <p className="text-sm text-gray-600">{transportMode.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-blue-600">{formatPrice(route.price)}</div>
          <div className="text-sm text-gray-500">{route.distance} km</div>
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/4 pr-2">
          <div className="text-sm font-medium text-gray-500">Departure</div>
          <div className="font-bold text-gray-900">{formatTime(route.departureTime)}</div>
        </div>
        <div className="w-1/4 pr-2">
          <div className="text-sm font-medium text-gray-500">Arrival</div>
          <div className="font-bold text-gray-900">{formatTime(route.arrivalTime)}</div>
        </div>
        <div className="w-1/4 pr-2">
          <div className="text-sm font-medium text-gray-500">Duration</div>
          <div className="font-bold text-gray-900">{route.duration} min</div>
        </div>
        <div className="w-1/4">
          <div className="text-sm font-medium text-gray-500">CO₂</div>
          <div className="font-bold flex items-center">
            {route.co2Emissions === 0 ? (
              <span className="text-green-600 flex items-center">
                <span className="mr-1">0</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className={route.co2Emissions < 1 ? "text-green-600" : route.co2Emissions < 3 ? "text-yellow-600" : "text-red-600"}>
                {route.co2Emissions} kg
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
        </div>
        <div className="flex-1">
          <div className="mb-3">
            <div className="font-medium text-gray-900">{fromLocation.name}</div>
            <div className="text-xs text-gray-500">{fromLocation.city}</div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{toLocation.name}</div>
            <div className="text-xs text-gray-500">{toLocation.city}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Select
        </button>
      </div>
    </div>
  );
}
