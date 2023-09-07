import axios from "axios"
import { createUrl, log } from "../utils/utils"

export async function addToCartApi(user_id,dish_id,qty_ordered) {
    debugger
    const url = createUrl('/order-menu-items/')
    const body = {
        user_id,
        dish_id,
        qty_ordered
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

export async function getCartApi(id) {
    debugger
    const url = createUrl('/order-menu-items/'+id)
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

export async function deleteCartApi(id) {
  debugger
  const url = createUrl('/order-menu-items/'+id)
  try {
    // make the api call using the token in the header
    const response = await axios.delete(url)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}