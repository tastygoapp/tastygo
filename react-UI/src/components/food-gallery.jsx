import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { constants } from '../utils/constants'
import { getRestaurantsApi } from '../services/restaurants'
import { useNavigate } from 'react-router-dom'

function FoodGallery() {
  const nav=useNavigate()
  const getDish=(id)=>
  {
    nav('/dish',{state:{id:id}})
  }
  const [restaurants, setRestaurants] = useState([])


  useEffect(() => {
    // get the list of products from server
    loadRestaurants()
  }, [])

  
  const loadRestaurants = async () => {
    debugger
    const response = await getRestaurantsApi()
    if (response['status'] === 'success') {
        setRestaurants(response['data'])
    } else {
      toast.error('Error while calling get /restautant api')
    }
  }

  return (
    <div>
      {/* <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty GO</h1> */}
      <h1 style={{ textAlign: 'center', margin: 10,fontFamily:'emoji'}}>Restaurant List</h1>
      
      <div className='row' style={{ marginTop: 100 }}>
        {restaurants.map((restaurant_tb) => {
          return (
            <div className='col-md-3' style={{marginBottom:15}} onClick={()=> {getDish(restaurant_tb['restaurant_id'])}}>
              <div className='card'>
                <img
                src={constants.serverUrl + '/' + restaurant_tb['image']}
                style={{ height: 200 }}
                alt=''
                />
               
                <div className='card-body'>
                  <h5 className='card-title'>{restaurant_tb['restaurant_name']}</h5>
                  <div className='card-text'>
                    <div>{restaurant_tb['restaurant_type']}</div>
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
export default FoodGallery
