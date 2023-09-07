
import axios from 'axios'
import { createUrl, log } from '../utils/utils'
export async function addDeliveryPartner(
    delivery_partner_first_name,
    delivery_partner_last_name,
  status,
  city,
  pin
  ) {
    const url = createUrl('/deliveryPartners/')
    const body = {
        delivery_partner_first_name,
        delivery_partner_last_name,
      status,
      city,
      pin
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

  export async function getDeliveryPartner() {
    debugger;
    const url = createUrl('/deliveryPartners/')
  
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

  export async function updateStatus(delivery_partner_id,status) {
    debugger;
    const url = createUrl('/deliveryPartners/'+delivery_partner_id)
    const headers ={
   delivery_partner_id 
    }
    const body= {
      status
    }
  
    try {
      // make the api call using the token in the header
      const response = await axios.put(url,headers,body)
      log(response.data)
      return response.data
    } catch (ex) {
      log(ex)
      return null
    }
  }
   
  