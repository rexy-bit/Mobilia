
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './Contexts/AuthContext'
import { VehiculesProvider } from './Contexts/VehiculesContext'
import Home from './Pages/Home'
import Header from './Components/HomeComponents/Header'
import Vehicules from './Pages/Vehicules'
import Account from './Pages/Account'

function App() {


  return (
   <AuthProvider>
     <VehiculesProvider>
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
    </Routes>
    </VehiculesProvider>
    </AuthProvider>
  )
}

export default App
