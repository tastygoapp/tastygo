import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function getDishes() {
  const url = createUrl('/dishes')

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
export async function addDish( restaurant_id, dish_type, dish_name, dish_price
  
  ) {
    const url = createUrl('/dishes/')
    const body = {
      restaurant_id, dish_type, dish_name, dish_price
    }
  debugger;
  console.log(restaurant_id)
    // wait till axios is making the api call and getting response from server
    try {
      const response = await axios.post(url, body)
      log(response.data)
      return response.data
    } catch (ex) {
      log(ex)
      return null
    }
  }
  