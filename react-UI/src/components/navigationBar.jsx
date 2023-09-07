import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { toast } from 'react-toastify'

function NavigationBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // logout the user
  const logoutUser = () => {
    // clear the session storage changes
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('useremail');
    sessionStorage.removeItem('usermobile');
    sessionStorage.removeItem('userpassword');
    sessionStorage.removeItem('image');
    // nav("/")
    // hide the navigation bar

    dispatch(logout())

    // redirect to login page
    navigate('/')
    toast.success("Logged Out Successfully")
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand'>Tasty GO</a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>

            <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/food-gallery'>
                  Food Gallery
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/cart'>
                  Cart
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/orders'>
                  Orders
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/profile'>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            <button onClick={logoutUser} className='btn'>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
