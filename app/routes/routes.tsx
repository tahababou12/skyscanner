import { useState, useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import { getLocationById } from "~/models/locations";
import { searchRoutes, Route } from "~/models/routes";
import RouteCard from "~/components/RouteCard";
import FilterPanel from "~/components/FilterPanel";
import SortOptions from "~/components/SortOptions";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Routes() {
  const [searchParams] = useSearchParams();
  const fromId = searchParams.get("from") || "";
  const toId = searchParams.get("to") || "";
  const departureTime = searchParams.get("time") || "09:00";

  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [sortBy, setSortBy] = useState<string>("duration");
  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    maxDuration: null as number | null,
    selectedModes: [] as string[]
  });

  const fromLocation = getLocationById(fromId);
  const toLocation = getLocationById(toId);

  useEffect(() => {
    if (fromId && toId) {
      const results = searchRoutes(fromId, toId, departureTime);
      setRoutes(results);
      setFilteredRoutes(results);
      // Initialize selected modes with all available modes
      setFilters({
        ...filters,
        selectedModes: [...new Set(results.map(route => route.transportModeId))]
      });
    }
  }, [fromId, toId, departureTime]);

  useEffect(() => {
    let filtered = [...routes];

    // Apply price filter
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(route => route.price <= filters.maxPrice!);
    }

    // Apply duration filter
    if (filters.maxDuration !== null) {
      filtered = filtered.filter(route => route.duration <= filters.maxDuration!);
    }

    // Apply transport mode filter
    if (filters.selectedModes.length > 0) {
      filtered = filtered.filter(route => filters.selectedModes.includes(route.transportModeId));
    }

    // Apply sorting
    filtered = sortRoutes(filtered, sortBy);

    setFilteredRoutes(filtered);
  }, [filters, sortBy, routes]);

  const handleFilterChange = (newFilters: {
    maxPrice: number | null;
    maxDuration: number | null;
    selectedModes: string[];
  }) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const sortRoutes = (routesToSort: Route[], sortByField: string): Route[] => {
    return [...routesToSort].sort((a, b) => {
      switch (sortByField) {
        case "price":
          return a.price - b.price;
        case "duration":
          return a.duration - b.duration;
        case "departure":
          return a.departureTime.localeCompare(b.departureTime);
        case "arrival":
          return a.arrivalTime.localeCompare(b.arrivalTime);
        case "emissions":
          return a.co2Emissions - b.co2Emissions;
        default:
          return a.duration - b.duration;
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Route information header */}
          {fromLocation && toLocation && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {fromLocation.name} to {toLocation.name}
              </h1>
              <p className="text-gray-600">
                {fromLocation.city} • Departure: {departureTime.replace(":", ":")}
              </p>
              <p className="text-gray-600 mt-2">
                {filteredRoutes.length} routes found
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>

            {/* Routes list */}
            <div className="lg:col-span-3">
              <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />

              {filteredRoutes.length > 0 ? (
                <div>
                  {filteredRoutes.map((route) => (
                    <RouteCard key={route.id} route={route} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">No routes found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search for a different route.
                  </p>
                  <a
                    href="/"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Back to Search
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
