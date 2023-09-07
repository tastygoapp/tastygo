import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../features/authSlice'
import { loginUserApi } from '../services/user'

function LoginUser() {
  const [user_email, setEmail] = useState('')
  const [user_password, setPassword] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginUser = async () => {  if (user_email.length === '') {
    toast.error('Please enter email')
  } else if (user_password.length === '') {
    toast.error('Please enter password')
  } else {
    // call register api
    debugger;
    console.log(user_email,user_password)
    const response = await loginUserApi(user_email, user_password)

    
    debugger;
    var len = 0
    if(response == null)
    {
      len = 0
    }
    else
    {
      len = response.data.length
    }
    
    // parse the response

    if (len === 1) {
      const { user_id, user_name, user_email, user_mobile, user_password, image } = response['data'][0];
      
      // Store user data in session storage
      sessionStorage.setItem('user_id', user_id);
      sessionStorage.setItem('username', JSON.stringify(user_name));
      sessionStorage.setItem('user_email', JSON.stringify(user_email));
      sessionStorage.setItem('user_mobile', JSON.stringify(user_mobile));
      sessionStorage.setItem('user_password', JSON.stringify(user_password));
      sessionStorage.setItem('image', JSON.stringify((image)));
      sessionStorage.setItem('isUserLoggedIn',true)
      navigate('/food-gallery')
    } else {
      toast.error('Invalid user name or password')
    }
  }
}

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
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
              <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default LoginUser
