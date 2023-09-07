import { useState } from "react"
import { addRestaurant } from "../services/restaurant"
import { addRestaurant as  addRestaurantApi} from "../services/restaurant"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function Addresturant()
{
    const nav=useNavigate()
    const [restaurant_name,setRestaurantName] = useState('')
    const [restaurant_type,setRestaurantType] = useState('')
    const [state,setRestaurantState] = useState('')
    const [city,setRestaurantCity] = useState('')
    const [pin,setRestaurantPin] = useState('')
    const [Image,setRestaurantImage] = useState('')

   async function AddRestuarants()
    {
        if (restaurant_name.length === '') {
            toast.error('Please enter restaurant name')
          
          } else if (restaurant_type.length == '') {
              toast.error('Please enter restaurant type ')
          }
          else if (state.length == '') {
            toast.error('Please enter state')
          } else if (city.length == '') {
            toast.error('Please enter city')
          } else if (pin.length == '') {
            toast.error('Please enter pincode')
          }else {
            // call register api
            const response = await addRestaurantApi(
              restaurant_name,restaurant_type,state,city,pin
            )
      
            // parse the response
            if (response['status'] === 'success') {
              toast.success('Successfully Added a new restaurant')
                  
                  nav('/restaurants')  
                  console.log("HIIIII")   
            } else {
              toast.error('Error while Adding new Restaurant, please try again')
            }
          }
        }
    
    return (
        <div>
        <h1 style={{ textAlign: 'center', margin: 10 }}>    Tasty GO</h1>
              <h2 style={{ textAlign: 'center', marginRight: 5 }}> Add Restaurant </h2>
        
            <div>
        
        
        
        
        
            </div>
        
        
        
       
        
               
                <div className='row'>
                <div className='col'></div>
                <div className='col'>
                <div className='form'>
               
                    <div className='mb-3'>
                      <label htmlFor=''>Restaurtant Name</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(j) => {
                          setRestaurantName(j.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Restaurant Type</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(j) => {
                          setRestaurantType(j.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Restaurant City</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setRestaurantCity(e.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Restaurant State</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setRestaurantState(e.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Restaurant Pincode</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setRestaurantPin(e.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                     
                      <button onClick={AddRestuarants} className='btn btn-success'>
                       Submit
                      </button>
                      <ToastContainer/>
                    </div>
                    
                    </div>
                   
                  </div>
                  <div className='col'></div>
                </div>
                
                      
            </div>    
    )

}

export default Addresturant;