import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css'
import NotFound from './components/errors/NotFoundPage'
import { Companies } from './components/companies/Companies';
import { Coupons } from './components/coupons/Coupons';
import { Customers } from './components/customers/Customers';
import { Categories } from './components/categories/Categories';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index path='/Coupons' element={<Coupons />} />
            <Route index path='/Coupons/:id' element={<Coupons />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Companies" element={<Companies />} />
            <Route path="/Categories" element={<Categories />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-left" pauseOnFocusLoss={false} />

    </Provider>
  );
}


export default App;