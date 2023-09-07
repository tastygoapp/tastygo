import { deleteRestaurantApi, getRestaurants as getRestaurantsApi} from "../services/restaurant"
import { useState } from "react"
import { useEffect} from 'react'
import { toast } from 'react-toastify'

import { constants } from '../utils/constants'
import { Navigate,useNavigate } from "react-router-dom"
import EditRestaurant from "./editRestaurant"
import NavigationBar from "./navigationBar"


function RestaurantList()
{
  
  
  const nav=useNavigate()
  const handleClick=()=>
  {
    nav('/editRestaurant')
  }
const [restaurants, setRestaurants] = useState([])
const [restaurant_id,setRestaurantId] =useState('')




  useEffect(() => {
    // get the list of products from server
    loadRestaurants()
    
  }, [])

  function logoutUser()
  {
    debugger;
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('useremail');
    sessionStorage.removeItem('usermobile');
    sessionStorage.removeItem('userpassword');
    sessionStorage.removeItem('image');
    nav("/")
  }

  async function deleteRestaurants(id)
  {
    debugger
    const response = await deleteRestaurantApi(id)
    if (response['status'] === 'success') {
      toast.success('Deleted Successfully')
  } else {
    toast.error('Error while calling deleting')
  }
  }

  const editRestaurants = async(restaurant_tb) =>
  {

    debugger;
    nav('/editRestaurant', { state: { id: restaurant_tb['restaurant_id'], restaurant_name: restaurant_tb['restaurant_name'],restaurant_type: restaurant_tb['restaurant_type'],city: restaurant_tb['city'],state1: restaurant_tb['state'],pin: restaurant_tb['pin'],image: restaurant_tb['image'] } })
  }
  
  const loadRestaurants = async () => {
    const response = await getRestaurantsApi()

    if (response['status'] === 'success') {
        setRestaurants(response['data'])
    } else {
      toast.error('Error while calling get /restautant api')
    }
  }

  return (
    <div>
    
      <button onClick={logoutUser} className='btn btn-danger' style={{float:"right" ,margin:10}}>
        LogOut
      </button>
    
      <h1 style={{ textAlign: 'center', margin: 10 }}>    Tasty GO</h1>
     
      <NavigationBar/>
      <h2 style={{ textAlign: 'center', marginRight: 5 }}>Restaurant List</h2>
      <div className='row' style={{ marginTop: 100 }}>
        {restaurants.map((restaurant_tb) => {
          return (
            <div className='col-md-3' style={{ margin: 10 }}>
              <div className='card'>
                <img onClick={handleClick}
                src={constants.serverUrl + '/' + restaurant_tb['image']}
                style={{ height: 200 }}
                alt=''
                />
               
                <div className='card-body'>
                  <h5 className='card-title'>{restaurant_tb['restaurant_name']}</h5>
                  <div className='card-text'>
                    <div>{restaurant_tb['restaurant_type']}</div>
                    <div><button onClick={()=> {editRestaurants(restaurant_tb)}} className='btn btn-primary' style={{float:"right" ,margin:10}}>Edit</button></div>
                    <div><button onClick={()=> {deleteRestaurants(restaurant_tb['restaurant_id'])}} className='btn btn-danger' style={{float:"right" ,margin:10}}>Delete</button></div>
                   
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
    }
export default RestaurantList;