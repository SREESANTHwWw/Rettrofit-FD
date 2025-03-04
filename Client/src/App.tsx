import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ToastContainer, Bounce } from 'react-toastify';

import Home from './Components/Home/Home';

import Admin from './Admin/AdminDash/Admin';
import ContactForm from './Components/Contact/ContactForm';
import ProductView from './Components/ProductPage/ProductView';
import ServicesView from './Components/ServicesPage/ServicesView';
import ProtectedRoute from './Components/ProtectRout';
import LoginRedirect from './Components/LoginRedirect';
import AdminDashBoard from './Admin/AdminDash/AdminDashBoard/AdminDashBoard';

// Lazy loaded components
const FetchContextProvider = lazy(() => import("./Components/Contexts/FetchContext"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <FetchContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contactus' element={<ContactForm />} />
            <Route path='/login' element={<LoginRedirect/>} />
            <Route path='/products/:category_id/:product_id' element={<ProductView />} />
            <Route path='/services/:id' element={<ServicesView />} />

            {/* Protected Admin Route */}
            <Route path='/admin/*' element={
              <ProtectedRoute allowedTypes={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashBoard/>} />
            </Route>
          </Routes>
        </FetchContextProvider>
      </BrowserRouter>

      {/* Toast Notification */}
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
        theme="dark"
        transition={Bounce}
      />
    </Suspense>
  );
}

export default App;
