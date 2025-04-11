import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { locations, getAllCities, getLocationsByCity, Location } from "~/models/locations";
import LocationSelector from "~/components/LocationSelector";
import TimeSelector from "~/components/TimeSelector";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "CityScanner - Find the best way to get around your city" },
    { name: "description", content: "Compare different transport options for intracity travel" },
  ];
};

export default function Index() {
  const [selectedCity, setSelectedCity] = useState<string>("New York");
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [departureTime, setDepartureTime] = useState<string>("09:00");
  
  const cities = getAllCities();
  const cityLocations = getLocationsByCity(selectedCity);

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      window.location.href = `/routes?from=${fromLocation.id}&to=${toLocation.id}&time=${departureTime}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Find the best way to get around your city
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Compare prices, times, and routes across all transport options
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setFromLocation(null);
                  setToLocation(null);
                }}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <LocationSelector
                label="From"
                locations={cityLocations}
                selectedLocation={fromLocation}
                onSelect={setFromLocation}
              />
              
              <LocationSelector
                label="To"
                locations={cityLocations}
                selectedLocation={toLocation}
                onSelect={setToLocation}
              />
              
              <TimeSelector
                label="Departure Time"
                selectedTime={departureTime}
                onSelect={setDepartureTime}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSearch}
                disabled={!fromLocation || !toLocation}
              >
                Search Routes
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Why use CityScanner?</h2>
              <p className="mt-4 text-lg text-gray-600">
                We help you find the best way to get around your city
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2">Save Money</h3>
                <p className="text-gray-600">
                  Compare prices across all transport options to find the most affordable way to travel.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold mb-2">Save Time</h3>
                <p className="text-gray-600">
                  Find the fastest routes and avoid delays with real-time information.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">
                  See the environmental impact of each option and choose greener ways to travel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Cities Section */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Popular Cities</h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore transport options in these major cities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="New York"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">New York</h3>
                    <p>Explore the Big Apple</p>
                  </div>
                </div>
              </div>

              <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                  alt="San Francisco"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">San Francisco</h3>
                    <p>Navigate the Bay Area</p>
                  </div>
                </div>
              </div>

              <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="London"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">London</h3>
                    <p>Discover the UK capital</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
