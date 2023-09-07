import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { userAddressApi } from "../services/user"
import { toast } from "react-toastify"
import { addOrdersApi, getOrdersByIdApi } from "../services/orders"
import { deleteCartApi } from "../services/cart"
import { getDiliveryPartnerApi } from "../services/delivery-partner"

export default function Address()
{
    const nav=useNavigate()
    const state = useLocation()
    var dishes = state['state']['dishes']
    var user_id = 0

    const [addresses, setAddrress] = useState([])

    useEffect(() => {
        // get the list of products from server
        userAddress()
      }, [])

    const userAddress = async() =>
    {
        user_id = sessionStorage.getItem('user_id')
        const response = await userAddressApi(user_id)
        if (response['status'] === 'success') {
            setAddrress(response['data'])
        } else {
            toast.error('Error while calling get /restautant api')
        }   
    }

    const addNewAddress = () =>
    {
        nav('/new-address')
    }

    const placeOrder = async(address_id) =>
    {
        user_id = sessionStorage.getItem('user_id')
        dishes.map(async(dish)=>{
            var dish_id = dish['dish_id']
            var restaurant_id = dish['restaurant_id']
            const response = await addOrdersApi(user_id,restaurant_id,dish_id,address_id,dish['qty_ordered']*dish['dish_price'])
            var order_id = response['data']['insertId']
            if (response['status'] === 'success') {
                const response = await deleteCartApi(dish_id)
                    if(response['status'] === 'success'){ 
                        const res = await getOrdersByIdApi(order_id)
                        if(res['status'] === 'success'){
                          var delivery_partner_id = 0
                          
                          res['data'].map((id) => {delivery_partner_id = id['delivery_partner_id']})
                          debugger
                          var res_partner_name = await getDiliveryPartnerApi(delivery_partner_id)
                          var name = ''
                          res_partner_name['data'].map((n) => {name=n['delivery_partner_name']})
                          toast.success('order placed successfully and Your Delivery Partner is = '+name)
                          nav('/cart')
                        }
                        
                    }
                    else
                    {
                        toast.error("Error while deleting to cart")
                        nav('/cart')
                    }
            } else {
                toast.error('Error while calling get /restautant api')
            }
        })
    }


    return(
        <div>
    {/* <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty GO</h1> */}
    <h1 style={{ textAlign: 'left', margin: 10 }}>Choose Address You want to deliver this to</h1>
    <button className='btn btn-success' style={{float:"left" ,margin:10}} onClick={()=> {addNewAddress()}}>
      Add New Address
    </button>
    <div className='row' style={{ marginTop: 100 }}>
      {addresses.map((address) => {
        return (
          <div className='col-md-3'>
            <div className='card'>
              <div className='card-body' onClick={()=> {placeOrder(address['address_id'])}}>
                <h5 className='card-title'>{address['city']}</h5>
                <div className='card-text'>
                  <div>{address['state']}</div>
                  <div>{address['pin']}</div>
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