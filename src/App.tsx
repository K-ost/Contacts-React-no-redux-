import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import User from './pages/User'
import { fetchToken } from './store/appSlice'


const App: React.FC = () => {
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(fetchToken())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<User />} />
    </Routes>
  )
}

export default App
