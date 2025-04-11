import { useState, useRef, useEffect } from "react";

interface TimeSelectorProps {
  label: string;
  selectedTime: string;
  onSelect: (time: string) => void;
}

export default function TimeSelector({
  label,
  selectedTime,
  onSelect
}: TimeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate time options in 30-minute intervals
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');
      timeOptions.push(`${hourStr}:${minuteStr}`);
    }
  }

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

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div 
        className="border border-gray-300 rounded-md p-2 flex items-center cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTime ? (
          <div className="flex items-center">
            <div className="mr-2">🕒</div>
            <div className="font-medium text-gray-900">{formatTime(selectedTime)}</div>
          </div>
        ) : (
          <div className="text-gray-500">Select a time</div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          <div>
            {timeOptions.map((time) => (
              <div
                key={time}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => {
                  onSelect(time);
                  setIsOpen(false);
                }}
              >
                <div className="mr-2">🕒</div>
                <div className="font-medium text-gray-900">{formatTime(time)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
