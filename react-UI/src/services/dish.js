import axios from "axios"
import { createUrl, log } from "../utils/utils"

export async function getDishesApi(id) {
    debugger
    const url = createUrl('/dishes/restaurant/'+id)
  
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

export async function getDishesByIdApi(id) {
    debugger
    const url = createUrl('/dishes/dish/'+id)
  
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