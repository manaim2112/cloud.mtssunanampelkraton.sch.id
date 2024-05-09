import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


import { Install } from './pages/Install.tsx'
import { Users } from './pages/dashboard/Users.tsx'

import IndexGuest from './pages/guest/Index.tsx'
import { CBTTest } from './pages/guest/CBTTest.tsx'
import Index from './pages/Index.tsx'
import Auth from './pages/Auth.tsx'
import Dashboard from './pages/dashboard/Index.tsx'
import Cbt from './pages/dashboard/Cbt.tsx'
import LacakCbt from './pages/dashboard/LacakCbt.tsx'
import Login from './pages/Login.tsx'
import { Analisis } from './pages/guest/Analisis.tsx'
import AnalisisAdmin from './pages/dashboard/Analisis.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='install' element={<Install/>}/>
      <Route path='' element={<Index/>}/>
      <Route path='auth' element={<Auth/>}>
        <Route path='user' element={<Login/>}/>
      </Route>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='dashboard/cbt/id/:id' element={<Cbt/>}/>
      <Route path='dashboard/cbt/id/:id/lacak' element={<LacakCbt/>}/>
      <Route path='dashboard/users' element={<Users/>}/>
      <Route path='dashboard/analisis' element={<AnalisisAdmin/>}/>


      <Route path="guest/:id" element={<IndexGuest/>}/>
      <Route path="guest/:id/cbt/:cbtid" element={<CBTTest/>}/>
      <Route path="guest/:id/cbt/:cbtid/analisis" element={<Analisis/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
