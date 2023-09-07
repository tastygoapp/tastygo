import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginUser from './components/loginUser'
import NavigationBar from './components/navigationBar'
import RegisterUser from './components/registerUser'

// used to register react-toastify
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'
import FoodGallery from './components/food-gallery'
import Dish from './components/dish'
import DishDetails from './components/dish-details'
import Cart from './components/cart'
import Orders from './components/orders'
import Address from './components/address'
import AddNewAddress from './components/new-address'
import Profile from './components/profile'

function App() {
  // use selector accepts a function which passes the store global state
  // at the moment we are interested only in auth slice
  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    // first read the current sessionStorage and see if user is logged in
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      // update the auth slice status to true
      dispatch(login())
    }
  }, [])

  return (
    <div className='container-fluid'>
      {/* navigation bar here */}
      {/* conditional rendering */}
      {<NavigationBar />}
      <div className='container'>
          <Routes>
          {/* home component  */}
          {/* <Route path='/' element={} /> */}

          {/* login component */}
          {/* <Route path='/' element={<Launcher />} /> */}
          
          <Route path='/' element={<LoginUser />} />

          {/* register component */}
          <Route path='/register' element={<RegisterUser />} />

          
          {/* product-gallery component */}
          <Route path='/food-gallery' element={<FoodGallery />} />

          {/* cart component */}
          <Route path='/dish' element={<Dish />} />

          <Route path='/dish-details' element={<DishDetails />} />

          <Route path='/cart' element={<Cart />} />


          {/* my orders component */}
          <Route path='/orders' element={<Orders />} />

          <Route path='/address' element={<Address />} />

          <Route path='/new-address' element={<AddNewAddress />} />

          <Route path='/profile' element={<Profile />} />
          
          </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
