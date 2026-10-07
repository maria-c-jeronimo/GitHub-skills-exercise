import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['Users', '/users'],
  ['Teams', '/teams'],
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Workouts', '/workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="navbar navbar-expand-lg navbar-dark container">
          <NavLink className="navbar-brand fw-bold" to="/users">
            <img
              alt=""
              className="brand-logo me-2"
              height="36"
              src={octofitLogo}
              width="36"
            />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav ms-auto flex-row flex-wrap">
            {navigation.map(([label, path]) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3${isActive ? ' active' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
      <footer className="site-footer py-3">
        <div className="container small">Move together. Get stronger together.</div>
      </footer>
    </div>
  )
}

export default App
