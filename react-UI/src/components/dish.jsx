
import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { getDishesApi } from '../services/dish';
import { toast } from 'react-toastify';
import { constants } from '../utils/constants';



function Dish() {

  const nav=useNavigate()

  const [dishes, setDishes] = useState([])

  debugger
  const state = useLocation()
  

  useEffect(() => {
    // get the list of products from server
    loadDishes() 
  }, [])

  function goBack()
  {
    nav('/food-gallery')
  }

  function dishDetails(dish_tb)
  {
    nav('/dish-details',{state:{dish_tb:dish_tb}})
  }

  const loadDishes = async () => {

    var id = state['state']['id']

    const response = await getDishesApi(id)
    if (response['status'] === 'success') {
        setDishes(response['data'])
    } else {
      toast.error('Error while calling get /restautant api')
    }
  }

  return (
    <div>
      {/* <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty GO</h1> */}
      <h2 style={{ textAlign: 'center', margin: 10 }}>Dishes List</h2>
      <button onClick={goBack} className='btn btn-danger' style={{float:"right" ,margin:10}}>
        Go Back
      </button>
      <div className='row' style={{ marginTop: 100 }}>
        {dishes.map((dish_tb) => {
          return (
            <div className='col-md-3'>
              <div className='card' onClick={()=> {dishDetails(dish_tb)}}>
                <img
                src={constants.serverUrl + '/' + dish_tb['dish_image']}
                style={{ height: 200 }}
                alt=''
                />
                <div className='card-body'>
                  <h5 className='card-title'>{dish_tb['dish_name']}</h5>
                  <div className='card-text'>
                    <div>{dish_tb['dish_type']}</div>
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

export default Dish
