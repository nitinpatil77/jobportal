import './App.css'
import AddJob from './pages/AddJob'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Navigate to="add-job" replace />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-job' element={<ManageJobs />} />
          <Route path='view-application' element={<ViewApplications />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
