import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerUser(
  first_name, last_name, user_name, user_email, user_mobile, user_password
) {
  const url = createUrl('/users/')
  const body = {
    first_name, last_name, user_name, user_email, user_mobile, user_password
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

export async function loginUserApi(user_email, user_password) {
  debugger
  const url = createUrl('/users/login')
  const body = {
    user_email,
    user_password,
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


export async function userAddressApi(user_id) {
  debugger
  const url = createUrl('/addresses/'+user_id)

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.get(url)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}


export async function addAddressApi(state,city,pin,user_id) {
  debugger
  const url = createUrl('/addresses/')
  const body ={
    state,
    city,
    pin,
    user_id
  }
  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url,body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}
