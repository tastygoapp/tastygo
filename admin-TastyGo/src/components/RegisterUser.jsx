
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerUser as registerUserApi } from '../services/user';
import "react-toastify/dist/ReactToastify.css";

function RegisterUser()
{

    const navigate=useNavigate();
    const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [user_name,setUser_Name] = useState('')
  const [user_email, setEmail] = useState('')
  const [user_mobile, setMobile] = useState('')
  const [user_password, setPassword] = useState('')
  const [user_confirmPassword, setConfirmPassword] = useState('')


  const registerUser = async () => {
    if (first_name.length === '') {
      toast.error('Please enter first name')
    } else if (last_name.length == '') {
      toast.error('Please enter last name')

    } else if (user_name.length == '') {
        toast.error('Please enter user name')
    }
    else if (user_email.length == '') {
      toast.error('Please enter email')
    } else if (user_mobile.length == '') {
      toast.error('Please enter mobile')
    } else if (user_password.length == '') {
      toast.error('Please enter password')
    } else if (user_confirmPassword.length == '') {
      toast.error('Please confirm password')
    } else if (user_password !== user_confirmPassword) {
      toast.error('Password does not match')
    } else {
      // call register api
      const response = await registerUserApi(
        first_name,
        last_name,
        user_name,
        user_email,
        user_mobile,
        user_password
      )

      // parse the response
      if (response['status'] === 'success') {
        toast.success('Successfully registered a new user')
            
            navigate('/users/login')  
            console.log("HIIIII")   
      } else {
        toast.error('Error while registering a new user, please try again')
      }
    }
  }
    return (
        <div>

            <h1 style={{ textAlign: 'center', margin: 10 }}>Tasty Go</h1>
          <h2 style={{ textAlign: 'center', margin: 10 }}>Register User</h2>
    
          <div className='row'>
            <div className='col'></div>
            <div className='col'>
              <div className='form'>
                <div className='mb-3'>
                  <label htmlFor=''>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor=''>User Name</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => {
                      setUser_Name(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Email</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Mobile Number</label>
                  <input
                    type='tel'
                    className='form-control'
                    onChange={(e) => {
                      setMobile(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <label htmlFor=''>Confirm Password</label>
                  <input
                    type='password'
                    className='form-control'
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                    }}
                  />
                </div>
    
                <div className='mb-3'>
                  <div className='mb-3'>
                    Already got an account? <Link to='/users/login'>Login here</Link>
                  </div>
                  <button onClick={registerUser} className='btn btn-success'>
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className='col'></div>
          </div>
        </div>
      )
    }


export default RegisterUser;