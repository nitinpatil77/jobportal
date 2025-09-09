import { useContext } from 'react'
import './App.css'
import RecruiterLogin from './components/RecruiterLogin'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { AppContext } from './context/AppContext'

function App() {

  const {showRecuriterLogin} = useContext(AppContext)

  return (
    <>
      {showRecuriterLogin && <RecruiterLogin/>}
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/apply-job/:id' element={<ApplyJob/>}/>
         <Route path='/applications' element={<Applications/>}/>         
      </Routes>
    </>
  )
}

export default App
