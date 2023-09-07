import axios from "axios"
import { createUrl, log } from "../utils/utils"

export async function getDiliveryPartnerApi(delivery_partner_id) {
    debugger
    const url = createUrl('/deliverPartners/'+delivery_partner_id)
  
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