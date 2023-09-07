import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addDish as addDishApi} from "../services/dish"
function AddDish(props)
{
    const nav=useNavigate()
const [restaurant_id,setRestaurantId] =useState(props.data)
const [dish_type,setDishType] =useState("")
const [dish_name, setDishName] =useState("")
const [dish_price, setDishPrice] =useState("")
const [dish_image,setDishImage] =useState("")

async function AddDishes()
    {
        if (restaurant_id.length === '') {
            toast.error('Please enter restaurant id')
          
          } else if (dish_type.length == '') {
              toast.error('Please enter dish Type')
          }
          else if (dish_name.length == '') {
            toast.error('Please enter Dish Name')
          } else if (dish_price.length == '') {
            toast.error('Please enter Price')
          } else {
            // call register api
            const response = await addDishApi(
                restaurant_id, dish_type, dish_name, dish_price
            )
      
            // parse the response
            if (response['status'] === 'success') {
              toast.success('Successfully Added a new Dish')
                  
             
                  console.log("HIIIII")   
            } else {
              toast.error('Error while Adding new Dish, please try again')
            }
          }
        }
    
    return (
        <div>
      
              <h2 style={{ textAlign: 'center', marginRight: 5 }}> Add Dishes </h2>
        
            <div>
        
        
        
        
        
            </div>
        
        
        
       
        
               
                <div className='row'>
                <div className='col'></div>
                <div className='col'>
                <div className='form'>
               
                    <div className='mb-3'>
                      <label htmlFor=''>Restaurtant id</label>
                      <input
                        type='text'
                        className='form-control'
                       value={props.data}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Dish Type</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(j) => {
                            setDishType(j.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Dish Name</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                            setDishName(e.target.value)
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor=''>Dish Price</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                            setDishPrice(e.target.value)
                        }}
                      />
                    </div>
                  
                    <div className='mb-3'>
                     
                      <button onClick={AddDishes} className='btn btn-success'>
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


export default AddDish;