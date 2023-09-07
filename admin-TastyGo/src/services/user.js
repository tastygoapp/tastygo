import axios from 'axios'
import { createUrl, log } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
export async function registerUser(
  first_name,
  last_name,
  user_name,
  user_email,
  user_mobile,
  user_password
) {
  const url = createUrl('/users/')
  const body = {
    first_name,
    last_name,
    user_name,
    user_email,
    user_mobile,
    user_password
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

export async function loginUser(user_email, user_password) {
  const url = createUrl('/users/login')
  const body = {
    user_email,
    user_password
  }

  // wait till axios is making the api call and getting response from server
  try {
    debugger;
    const response = await axios.post(url,body)
    log(response.data)
    log(response.status)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}
