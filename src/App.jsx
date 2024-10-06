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
import { MyCoupons } from './components/coupons/MyCoupons';
import { Purchases } from './components/companies/Purchases';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index path='/Coupons' element={<Coupons />} />
            <Route index path='/MyCoupons' element={<MyCoupons />} />
            <Route index path='/Purchases' element={<Purchases />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Companies" element={<Companies />} />
            <Route path="/Categories" element={<Categories />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-left" pauseOnFocusLoss={false} limit={1} autoClose={5000}/>

    </Provider>
  );
}


export default App;