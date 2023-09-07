import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { getDishesApi, getDishesByIdApi } from '../services/dish';
import { toast } from 'react-toastify';
import { constants } from '../utils/constants';
import { addToCartApi, deleteCartApi } from '../services/cart';



function DishDetails() {

  const nav=useNavigate()

  const [dishes, setDishes] = useState([])
  var [qty_ordered, setQty] = useState(0)
  

  debugger
  const state = useLocation()

  useEffect(() => {
    // get the list of products from server
    loadDishes() 
  }, [])

  function goBack()
  {
    var dish_tb = state['state']['dish_tb']
    nav('/dish',{state:{id:dish_tb['restaurant_id']}})
  }

  function increaseQty()
  {
    if(qty_ordered === 10)
    {
      setQty(10)
    }
    else
    {
      setQty(qty_ordered += 1)
    }
  }

  const decreaseQty = async(dish_id) =>
  {
    if(qty_ordered === 0)
    {
      setQty(0)
    }
    else
    {
      setQty(qty_ordered -= 1)
    }
  }

  const addToCart = async (dish_tb) =>{
    var user_id = sessionStorage.getItem('user_id')
    var dish_id = dish_tb['dish_id']

  if(user_id==null)
  {
    toast.info("First Login to add to Cart and Order your Food")
    nav('/')
  }
  else
  {
    if(qty_ordered > 0)
    {
      const response = await addToCartApi(user_id,dish_id,qty_ordered)
      if(response['status'] === 'success'){
        toast.success("Qty Added to the Cart")
        nav('/food-gallery')
      }
      else
      {
        toast.error("Error while adding to cart")
        nav('/food-gallery')
      }
    }
    else
    {
      const response = await deleteCartApi(dish_id)
      if(response['status'] === 'success'){
        toast.success("Dish removed from cart")
        nav('/cart')
      }
      else
      {
        toast.error("Error while deleting to cart")
        nav('/cart')
      }
    }
  }

    
  }


  const loadDishes = async () => {
    debugger
    var dish_tb = state['state']['dish_tb']
    const response = await getDishesByIdApi(dish_tb['dish_id'])
    if (response['status'] === 'success') {
        setDishes(response['data'])
    } else {
      toast.error('Error while calling get /restautant api')
    }
  }


  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty GO</h1>
      <button onClick={()=> {goBack()}} className='btn btn-danger' style={{float:"right" ,margin:10}}>
        Go Back
      </button>
      <div className='row' style={{ marginTop: 100 }}>
        {dishes.map((dish_tb) => {
          return (
            <div className='col-md-4'>
              <div className='card'>
                <img
                src={constants.serverUrl + '/' + dish_tb['dish_image']}
                style={{ height: 400 , width:420 }}
                alt=''
                />
                </div>
                <div className='card-body' style={{float:'left'}}>
                  <h5 classN ame='card-title'>{dish_tb['dish_name']}</h5>
                  <div className='card-text'>
                    <div>{dish_tb['dish_type']}</div>
                  </div>
                </div>
                <div style={{float:'right'}}>
                  &nbsp;&nbsp;<button className='btn btn-primary' onClick={()=> {increaseQty()}}>+</button>
                  &nbsp;&nbsp;&nbsp;{qty_ordered}&nbsp;&nbsp;&nbsp;
                  <button className='btn btn-primary' onClick={()=> {decreaseQty(dish_tb['dish_id'])}}>-</button>&nbsp;&nbsp;&nbsp;
                  <button className='btn btn-primary' onClick={()=> {addToCart(dish_tb)}}>Submit</button>
                </div>
              
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DishDetails
