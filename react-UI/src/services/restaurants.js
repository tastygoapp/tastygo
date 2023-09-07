import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function getRestaurantsApi() {
  const url = createUrl('/restaurants')

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



export async function deleteRestaurantApi(id) {
  const url = createUrl('/restaurants/'+id)

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

export async function getRestaurantsbyId(id) {
  const url = createUrl('/restaurants/'+id)

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