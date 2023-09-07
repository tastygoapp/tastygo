import axios from "axios"
import { createUrl, log } from "../utils/utils"

export async function getOrdersApi(id) {
    debugger
    const url = createUrl('/dishes/user/'+id)

    try {
      // make the api call using the token in the header
      const response = await axios.get(url)
      log(response.data)
      return response.data
    } catch (ex) {
      log(ex)
      return null
    }
}

export async function addOrdersApi(user_id, restaurant_id, dish_id, user_address_id, total_amount) {
  debugger
  const url = createUrl('/orders/')
  const body = {
    user_id,
    restaurant_id, 
    dish_id, 
    user_address_id, 
    total_amount
  }
  try {
    // make the api call using the token in the header
    const response = await axios.post(url,body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}


export async function getOrdersByIdApi(order_id) {
  debugger
  const url = createUrl('/orders/'+order_id)
  try {
    // make the api call using the token in the header
    const response = await axios.get(url)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}