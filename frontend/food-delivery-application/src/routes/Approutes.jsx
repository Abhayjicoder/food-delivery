import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import Home from '../pages/general/home'
import CreateFoodPartner from '../pages/food-partner/CreateFoodPartner'

const Approutes = () => {
  return (
    <Router>
        <Routes>
            <Route path = "/user/register" element = {<UserRegister />} />
            <Route path = "/user/login" element = {<UserLogin />} />
            <Route path = "/food-partner/register" element = {<FoodPartnerRegister />} />
            <Route path = "/food-partner/login" element = {<FoodPartnerLogin />} />
            <Route path = "/" element = {<Home />} />
            <Route path = "/create-food-item" element = {<CreateFoodPartner />} />
        </Routes>
        </Router>
  )
}

export default Approutes