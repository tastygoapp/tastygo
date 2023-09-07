import { useEffect, useState } from "react";
import { getRestaurantsbyId as getRestaurantsbyIdApi } from "../services/restaurant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from "react-router-dom";
import { updateRestaurant as UpdateRestaurantApi } from "../services/restaurant";
import AddDish from "./addDish";


function EditRestaurant()
{

    const {state} = useLocation(); 
    const {id,restaurant_name,restaurant_type,city,state1,pin,image} = state
    debugger;

const [name,setRestaurantName] = useState('')
const [type,setRestaurantType] = useState('')
const [states,setRestaurantState] = useState('')
const [City,setRestaurantCity] = useState('')
const [pincode,setRestaurantPin] = useState('')
const [Image,setRestaurantImage] = useState('')
useEffect(() => {
    // get the list of products from server
    // getRestaurantsbyId()
    
  }, [])

  async function UpdateRestaurant()
  {
    debugger;
    const response = await UpdateRestaurantApi(id,name,type,states,City,pincode)
   
    
    if (response['status'] === 'success') {
      toast.success('Updated  Successfully')
  } else {
    toast.error('Error while calling deleting')
  }
  }
  
async function getRestaurantsbyId()
  {
    debugger
    const response = await getRestaurantsbyIdApi(id)
    if (response['status'] === 'success') {
      // toast.success('Deleted Successfully')
  } else {
    toast.error('Error while calling deleting')
  }
  
  }
return (
<div>
<h1 style={{ textAlign: 'center', margin: 10 }}>    Tasty GO</h1>
      <h2 style={{ textAlign: 'center', marginRight: 5 }}>Restaurant List</h2>

    <div>





    </div>




    <div>
    <div>Restaurant details</div>
    <div>{state.restaurant_name}</div>
    <div>{state.restaurant_type}</div>
    <div>{state.city}</div>
    <div>{state.state1}</div>
      <div>{state.pin}</div>
        

        <div style={  {textAlign: 'center', margin: 10}}>Edit Restaurant Details</div>
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
             
              <button onClick={UpdateRestaurant} className='btn btn-success'>
               Submit
              </button>
            </div>
            
            </div>
           
          </div>
          <div className='col'></div>
        </div>
        
        <div style={  {textAlign: 'center', margin: 10}}>Add Dishes</div>   

        <AddDish data={state.id}></AddDish> 
    </div>

    </div>
)

}

export default EditRestaurant;