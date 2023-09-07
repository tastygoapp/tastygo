import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { addAddressApi } from "../services/user"

export default function AddNewAddress()
{
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [pin, setPin] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  const addAddress = async () => {
    if (state.length == '') {
      toast.error('Please enter state')
    } else if (city.length == '') {
      toast.error('Please enter city')
    } else if (pin.length == '') {
      toast.error('Please enter pin')
    } 
    else {
      var user_id = sessionStorage.getItem('user_id')
      const response = await addAddressApi(
        state,
        city,
        pin,
        user_id
      )

      // parse the response
      if (response['status'] === 'success') {
        toast.success('Successfully added address')

        // go back to cart
        navigate('/cart')
      } else {
        toast.error('Error while adding a new address, please try again')
      }
    }
  }


    return(
        <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Add Address</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>State</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setState(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>City</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setCity(e.target.value)
                }}
              />
            </div>
              
            <div className='mb-3'>
              <label htmlFor=''>Pin</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setPin(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <button onClick={addAddress} className='btn btn-success'>
                Add Address
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
    )
}