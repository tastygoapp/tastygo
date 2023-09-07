import { useState } from "react"
import { addDeliveryPartner as  addDeliveryPartnerApi} from "../services/deliveryPartner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function AddDeliveryPartner()
{
const nav=useNavigate()
    const [delivery_partner_first_name,setFirstName] = useState('')
    const [delivery_partner_last_name,setLastName] = useState('')
    const [status,setStatus] = useState('')
    const [city,setCity] = useState('')
    const [pin,setPin] = useState('')


    const addDelivery = async () => {
        if (delivery_partner_first_name.length === '') {
          toast.error('Please enter first name')
        } else if (delivery_partner_last_name.length == '') {
          toast.error('Please enter last name')
    
        } else if (status.length == '') {
            toast.error('Please enter user name')
        }
        else if (city.length == '') {
          toast.error('Please enter email')
        } else if (pin.length == '') {
          toast.error('Please enter mobile')
        } else {
          // call register api
          const response = await addDeliveryPartnerApi(
            delivery_partner_first_name,
            delivery_partner_last_name,
            status,
            city,
            pin
          )
    
          // parse the response
          if (response['status'] === 'success') {
            toast.success('Successfully registered a new Delivery Partner')
                
                nav('/restaurants') 
                
          } else {
            toast.error('Error while registering a new Delivery Partner, please try again')
          }
        }
      }
 
    return (
        
        <div>
            <h1 style={{ textAlign: 'center', margin: 10 }}>    Tasty GO</h1>
            <h2 style={{ textAlign: 'center', margin: 10 }}>    Add Delivery Partner </h2>
             <div className='row'>
        <div className='col'></div>
        <div className='col'>
        <div className='form'>
       
            <div className='mb-3'>
              <label htmlFor=''>First Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(j) => {
                  setFirstName(j.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''> Last Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(j) => {
                  setLastName(j.target.value)
                }}
              />
            </div>
           
            </div>
            <div className='mb-3'>
              <label htmlFor=''> Status</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setStatus(e.target.value)
                }}
              />
               <div className='mb-3'>
              <label htmlFor=''> City</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setCity(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''> Pincode</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setPin(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
             
              <button onClick={addDelivery} className='btn btn-success'>
               Submit
              </button>
            </div>
            
            </div>
           
          </div>
          <div className='col'></div>
        </div>
        
        </div>
    )
}
export default AddDeliveryPartner;