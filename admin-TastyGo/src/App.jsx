import './App.css';
import { Route,Routes } from 'react-router-dom';
import LoginUser from '../src/components/LoginUser'
import RegisterUser from'./components/RegisterUser'
import RestaurantList from './components/RestaurantList';
import EditRestaurant from './components/editRestaurant';
import Home from './components/home';
import AddDeliveryPartner from './components/addDeliveryPartner';
import Addresturant from './components/addRestaurant';
import Status from './components/status';
function App() {
  return (

    
    <div className="Container-fluid">
      <Routes>
      < Route path='/' element={<LoginUser/>} />
      < Route path='/users/' element={<RegisterUser/>} />
      < Route path='/restaurants' element={<RestaurantList/>} />
      < Route path='/home' element={<Home/>}/>
      < Route path='/editRestaurant' element={<EditRestaurant/>} />
      < Route path='/addDeliveryPartner' element={<AddDeliveryPartner/>}/>
      < Route path='/addRestaurant' element={<Addresturant/>}/>
      < Route path='/status' element={<Status/>}/>


      </Routes>
 

  
    </div>
  );
}

export default App;
