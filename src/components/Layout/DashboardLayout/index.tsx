import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 h-full bg-gray-800 text-white">
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" className="block p-4">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/user-management" className="block p-4">
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/settings" className="block p-4">
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-col flex-grow">
        <header className="bg-gray-800 text-white p-4">
          <h1>Dashboard Header</h1>
        </header>
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
