interface SortOptionsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export default function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  const options = [
    { value: "price", label: "Price" },
    { value: "duration", label: "Duration" },
    { value: "departure", label: "Departure Time" },
    { value: "arrival", label: "Arrival Time" },
    { value: "emissions", label: "CO₂ Emissions" }
  ];

  return (
    <div className="flex items-center mb-4">
      <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            className={`px-3 py-1 text-sm rounded-full ${
              sortBy === option.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => onSortChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
