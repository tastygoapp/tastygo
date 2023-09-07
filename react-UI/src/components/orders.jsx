import { toast } from "react-toastify"
import { constants } from "../utils/constants"
import { getCartApi } from "../services/cart"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getOrdersApi } from "../services/orders"

function Orders()
{

const nav=useNavigate()

const [dishes, setDishes] = useState([])

debugger
const state = useLocation()


useEffect(() => {
  // get the list of products from server
  loadDishes() 
}, [])


function dishDetails(dish_tb)
{
  nav('/dish-details',{state:{dish_tb:dish_tb}})
}

const loadDishes = async () => {
  var id = sessionStorage.getItem('user_id')

  if(id==null)
  {
    toast.info("First Login to see your Orders")
    nav('/')
  }
  else
  {
    const response = await getOrdersApi(id)
    if (response['status'] === 'success') {
        debugger
        setDishes(response['data'])
    } else {
      toast.error('Error while calling get /restautant api')
    }
  }
}

return (
  <div>
    {/* <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty GO</h1> */}
    <h1 style={{ textAlign: 'left', margin: 10 }}>My Orders</h1>
    <div className='row'>
      {dishes.map((dish_tb) => {
        return (
          <div className='col-md-3' style={{ marginBottom: 15 }}>
            <div className='card'>
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

export default Orders