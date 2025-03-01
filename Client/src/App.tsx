import React from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'


import Home from './Components/Home/Home'
import Login from './Admin/Login/Login'
import { ToastContainer,Bounce } from 'react-toastify'
import Admin from './Admin/AdminDash/Admin'

import ContactForm from './Components/Contact/ContactForm'
import FetchContextProvider from './Components/Contexts/FetchContext'
import ProductView from './Components/ProductPage/ProductView'
// import ProtectedRoute from './Components/ProtectRout'

const App = () => {
  return (
    <div>
      <FetchContextProvider>
           <BrowserRouter>
    <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/contactus' element={<ContactForm/>} />
 
  <Route path='/admin/*' element={
  
    <Admin/>
    }/>


  <Route path='/login' element={<Login/>}/>
  <Route path='/products/:id' element={<ProductView/>}/>
 
    </Routes>
    
    </BrowserRouter>
        
      </FetchContextProvider>
   
     <ToastContainer
     position="top-center"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick={false}
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="colored"
     transition={Bounce}
     />

    </div>
    
  )
}

export default App