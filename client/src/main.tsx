import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


const App = lazy(() => import("./App.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"))
const Login = lazy(() => import("./pages/Login.tsx"))
const Install = lazy(() => import("./pages/Install.tsx"))

const Dashboard = lazy(() => import("./pages/dashboard/Index.tsx"))
const Users = lazy(() => import("./pages/dashboard/Users.tsx"))

const AnalisisAdmin = lazy(() => import("./pages/dashboard/Analisis.tsx"))
const IndexGuest = lazy(() => import("./pages/guest/Index.tsx"))
const Index = lazy(() => import("./pages/Index.tsx"))
import { CBTTest } from './pages/guest/CBTTest.tsx'
import Cbt from './pages/dashboard/Cbt.tsx'
import LacakCbt from './pages/dashboard/LacakCbt.tsx'
import { Analisis } from './pages/guest/Analisis.tsx'
const ResultUser = lazy(() => import("./pages/dashboard/Result.tsx"))

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
        <Route path='dashboard/cbt/id/:id/lacak/:userid' element={<ResultUser/>}/>
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
