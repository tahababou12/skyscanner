export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-blue-600 text-2xl font-bold mr-2">🌍</div>
            <h1 className="text-xl font-bold text-gray-900">CityScanner</h1>
          </div>
          <nav className="flex space-x-6">
            <a href="/" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
            <a href="/routes" className="text-gray-900 hover:text-blue-600 font-medium">Routes</a>
            <a href="#" className="text-gray-900 hover:text-blue-600 font-medium">My Trips</a>
            <a href="#" className="text-gray-900 hover:text-blue-600 font-medium">Help</a>
          </nav>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
