import { Suspense } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <Suspense fallback={"Tunggu Sebentar"}>
      <Outlet/>
    </Suspense>
  )
}

export default App
