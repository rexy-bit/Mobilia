
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './Contexts/AuthContext'
import { VehiculesProvider } from './Contexts/VehiculesContext'
import Home from './Pages/Home'
import Header from './Components/HomeComponents/Header'
import Vehicules from './Pages/Vehicules'
import Account from './Pages/Account'
import Discover from './Pages/Discover'
import Reservation from './Pages/Reservation'
import { ReservationProvider } from './Contexts/ReservationContext'
import Reservations from './Pages/Reservations'
import Guide from './Pages/Guide'
import { RequestProvider } from './Contexts/RequestContext'
import UserRoute from './Layouts/UserRoute'
import PublicLayout from './Layouts/PublicLayout'
import AdminRoute from './Layouts/AdminRoute'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './AdminPages/Dashboard'
import AdminReservations from './AdminPages/AdminReservations'
import AdminRequests from './AdminPages/AdminRequests'
import AdminAccount from './AdminPages/AdminAccount'
import AdminVehicules from './AdminPages/AdminVehicules'
import Add from './AdminPages/Add'

function App() {


  return (
   <AuthProvider>
     <VehiculesProvider>
      <ReservationProvider>
        <RequestProvider>
        
    <Routes>

        <Route element={
          <UserRoute>
            <PublicLayout/>
          </UserRoute>
        }>
 
        <Route path='/' element={
          <>
             <Home/>
           </>
        }/>

        <Route path='/vehicules' element={
          <>
            <Vehicules/>
          </>
        }/>

         <Route path='/account' element={
          <>
           
            <Account/>
       
          </>
         }/>

         <Route path='/discover/:id' element={
          <>
           
            <Discover/>
          </>
         }/>

         <Route path='/reservation/:id' element={
          <>
            <Reservation/> 
          </>
         }/>

         <Route path='/reservations' element={
          <>
            <Reservations/>
          </>
         }/>

         <Route path='/guide' element={
          <>
            <Guide/>
          </>
         }/>
         </Route>

         <Route path='/admin/*' element={
          <AdminRoute>
             <AdminLayout/>
          </AdminRoute>
         }>

          <Route path="dashboard" element={
            <Dashboard/>
          }/>
           
           <Route path='reservations' element={
            <AdminReservations/>
           }/>

           <Route path="requests" element={
            <AdminRequests/>
           }/>

           <Route path='vehicules' element={
            <AdminVehicules/>
           }/>

           <Route path='account' element={
            <AdminAccount/>
           }/>

           <Route path='add' element={
            <Add/>
           }/>
         </Route>
    </Routes>

         </RequestProvider>
      </ReservationProvider>
    </VehiculesProvider>
    </AuthProvider>
  )
}

export default App
