
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

function App() {


  return (
   <AuthProvider>
     <VehiculesProvider>
      <ReservationProvider>
        <RequestProvider>
        
    <Routes>
 
        <Route path='/' element={
          <>
             <Header/>
             <Home/>
           </>
        }/>


        <Route path='/vehicules' element={
          <>
            <Header/>
            <Vehicules/>
          </>
        }/>

         <Route path='/account' element={
          <>
            <Header/>
            <Account/>
       
          </>
         }/>

         <Route path='/discover/:id' element={
          <>
            <Header/>
            <Discover/>
          </>
         }/>

         <Route path='/reservation/:id' element={
          <>
            <Header/>
            <Reservation/> 
          </>
         }/>

         <Route path='/reservations' element={
          <>
            <Header/>
            <Reservations/>
          </>
         }/>

         <Route path='/guide' element={
          <>
            <Header/>
            <Guide/>
          </>
         }/>
    </Routes>

         </RequestProvider>
      </ReservationProvider>
    </VehiculesProvider>
    </AuthProvider>
  )
}

export default App
