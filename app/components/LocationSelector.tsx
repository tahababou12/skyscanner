import { useState, useEffect, useRef } from "react";
import { Location } from "~/models/locations";

interface LocationSelectorProps {
  label: string;
  locations: Location[];
  selectedLocation: Location | null;
  onSelect: (location: Location) => void;
}

export default function LocationSelector({
  label,
  locations,
  selectedLocation,
  onSelect
}: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div 
        className="border border-gray-300 rounded-md p-2 flex items-center cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLocation ? (
          <div className="flex items-center">
            <div className="mr-2">
              {selectedLocation.type === 'airport' && '✈️'}
              {selectedLocation.type === 'train_station' && '🚆'}
              {selectedLocation.type === 'bus_station' && '🚌'}
              {selectedLocation.type === 'metro_station' && '🚇'}
              {selectedLocation.type === 'landmark' && '🏛️'}
            </div>
            <div>
              <div className="font-medium text-gray-900">{selectedLocation.name}</div>
              <div className="text-xs text-gray-500">{selectedLocation.city}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a location</div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          <div className="p-2 sticky top-0 bg-white border-b border-gray-200">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    onSelect(location);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <div className="mr-2">
                    {location.type === 'airport' && '✈️'}
                    {location.type === 'train_station' && '🚆'}
                    {location.type === 'bus_station' && '🚌'}
                    {location.type === 'metro_station' && '🚇'}
                    {location.type === 'landmark' && '🏛️'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-xs text-gray-500">{location.city}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No locations found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
