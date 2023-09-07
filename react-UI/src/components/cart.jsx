import { toast } from "react-toastify"
import { constants } from "../utils/constants"
import { getCartApi } from "../services/cart"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { userAddressApi } from "../services/user"

function Cart()
{

const nav=useNavigate()

const [dishes, setDishes] = useState([])
const [total, setTotal] = useState(0)
var t = 0
debugger


useEffect(() => {
  // get the list of products from server
  loadDishes()
}, [])

useEffect(() => {
  Total()
}, [dishes])

function dishDetails(dish_tb)
{
  nav('/dish-details',{state:{dish_tb:dish_tb}})
}

const addToOrders = async() =>
{
  nav('/address',{state:{dishes:dishes}})
}

const loadDishes = async () => {
  var id = sessionStorage.getItem('user_id')

  if(id==null)
  {
    toast.info("First Login to see your cart")
    nav('/')
  }
  else
  {
    const response = await getCartApi(id)
    if (response['status'] === 'success') {
        setDishes(response['data'])
    } else {
      toast.error('Error while calling get /restautant api')
    }
  }
}

const Total = async() =>
{
  dishes.map((dish_tb) => {
    t += dish_tb['qty_ordered']*dish_tb['dish_price']
  })
  setTotal(t)
}

return (
  <div>
    {/* <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty GO</h1> */}
    <h1 style={{ textAlign: 'left', margin: 10 }}>My Cart</h1>
    <button className='btn btn-success' style={{float:"left" ,margin:10}} onClick={()=> {addToOrders()}}>
      Order Total = {total}
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
                  <div>Qty*Price = {dish_tb['qty_ordered']} * {dish_tb['dish_price']} = {dish_tb['qty_ordered']*dish_tb['dish_price']}</div>
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

export default Cart