import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function getRestaurants() {
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


export async function updateRestaurant(id,name,type,states,City,pincode) {
  const url = createUrl('/restaurants/'+id)
  const headers ={
    id
  }
  const body= {
    restaurant_name: name,
    restaurant_type: type,
    state: states,
    city: City,
    pin: pincode,
    id
  }

  try {
    // make the api call using the token in the header
    const response = await axios.put(url,body,headers)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function addRestaurant( restaurant_name,restaurant_type,state,city,pin
  
) {
  const url = createUrl('/restaurants/')
  const body = {
    restaurant_name,restaurant_type,state,city,pin
  }

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



