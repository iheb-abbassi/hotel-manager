import { Outlet, Link, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link to="/" className="font-semibold text-lg">eXXellent Nights!</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({isActive}) => isActive ? 'text-blue-600' : 'text-gray-600'}>Rooms</NavLink>
            <NavLink to="/rooms/new" className={({isActive}) => isActive ? 'text-blue-600' : 'text-gray-600'}>Add Room</NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-center text-xs text-gray-500 py-6">© eXXellent Nights!</footer>
    </div>
  )
}
