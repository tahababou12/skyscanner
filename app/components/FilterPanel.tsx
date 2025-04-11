import { useState } from "react";
import { TransportMode, transportModes } from "~/models/transportModes";

interface FilterPanelProps {
  onFilterChange: (filters: {
    maxPrice: number | null;
    maxDuration: number | null;
    selectedModes: string[];
  }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [maxDuration, setMaxDuration] = useState<number | null>(null);
  const [selectedModes, setSelectedModes] = useState<string[]>(transportModes.map(mode => mode.id));

  const handlePriceChange = (value: string) => {
    const price = value === "" ? null : parseInt(value);
    setMaxPrice(price);
    onFilterChange({ maxPrice: price, maxDuration, selectedModes });
  };

  const handleDurationChange = (value: string) => {
    const duration = value === "" ? null : parseInt(value);
    setMaxDuration(duration);
    onFilterChange({ maxPrice, maxDuration: duration, selectedModes });
  };

  const handleModeToggle = (modeId: string) => {
    const newSelectedModes = selectedModes.includes(modeId)
      ? selectedModes.filter(id => id !== modeId)
      : [...selectedModes, modeId];
    
    setSelectedModes(newSelectedModes);
    onFilterChange({ maxPrice, maxDuration, selectedModes: newSelectedModes });
  };

  const handleSelectAll = () => {
    const allModes = transportModes.map(mode => mode.id);
    setSelectedModes(allModes);
    onFilterChange({ maxPrice, maxDuration, selectedModes: allModes });
  };

  const handleClearAll = () => {
    setSelectedModes([]);
    onFilterChange({ maxPrice, maxDuration, selectedModes: [] });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Filters</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
        <input
          type="number"
          min="0"
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
          placeholder="Any price"
          value={maxPrice === null ? "" : maxPrice}
          onChange={(e) => handlePriceChange(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Duration (minutes)</label>
        <input
          type="number"
          min="0"
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
          placeholder="Any duration"
          value={maxDuration === null ? "" : maxDuration}
          onChange={(e) => handleDurationChange(e.target.value)}
        />
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Transport Modes</label>
          <div className="text-xs">
            <button 
              className="text-blue-600 hover:text-blue-800 mr-2"
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button 
              className="text-blue-600 hover:text-blue-800"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {transportModes.map((mode) => (
            <div key={mode.id} className="flex items-center">
              <input
                type="checkbox"
                id={`mode-${mode.id}`}
                checked={selectedModes.includes(mode.id)}
                onChange={() => handleModeToggle(mode.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`mode-${mode.id}`} className="ml-2 flex items-center text-gray-900">
                <span className="mr-2">{mode.icon}</span>
                <span>{mode.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
