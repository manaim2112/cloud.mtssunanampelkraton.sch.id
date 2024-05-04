import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const Index = lazy(() => import("./pages/Index.tsx"))
const Auth = lazy(() => import("./pages/Auth.tsx"))
const Login = lazy(() => import("./pages/Login.tsx"))
const Dashboard = lazy(() => import("./pages/dashboard/Index.tsx"))
const Cbt = lazy(() => import("./pages/dashboard/Cbt.tsx"))
const LacakCbt = lazy(() => import("./pages/dashboard/LacakCbt.tsx"))
import { Install } from './pages/Install.tsx'
import { Users } from './pages/dashboard/Users.tsx'

import IndexGuest from './pages/guest/Index.tsx'
import { CBTTest } from './pages/guest/CBTTest.tsx'

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


      <Route path="guest/:id" element={<IndexGuest/>}/>
      <Route path="guest/:id/cbt/:cbtid" element={<CBTTest/>}/>
      <Route path="guest/:id/cbt/:cbtid/result" element={<CBTTest/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
