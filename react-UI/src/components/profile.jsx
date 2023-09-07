import { useState } from "react";
import { constants } from "../utils/constants";

export default function Profile()
{
    // var user_id = sessionStorage.getItem('user_id');
    // var username = sessionStorage.getItem('username');
    var user_email = sessionStorage.getItem('user_email');
    var user_mobile = sessionStorage.getItem('user_mobile');
    var user_password = sessionStorage.getItem('user_password');
    var image = sessionStorage.getItem('image').replaceAll('"','');

    var [user_id,setUserId] = useState(sessionStorage.getItem('user_id'))
    var [username,setUsername] = useState(sessionStorage.getItem('username').replaceAll('"',''))
    var [email,setEmail] = useState(user_email.replaceAll('"',''))
    var [mobile,setMobile] = useState(user_mobile.replaceAll('"',''))
    var [password,setPassword] = useState(user_password.replaceAll('"',''))
    // var [user_id,setUserId] = useState(user_id)


    return(<>
        <div className='row'>
        <div className='col'>
        <img
                src={constants.serverUrl + '/' + image}
                style={{ height: 200 }}
                alt=''
                />
          <form method="post" action={constants.serverUrl+"/users/uploads"} enctype="multipart/form-data">
            <input type="file" name="image"/>
            <button type="submit">Submit</button>
          </form>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                value={email}
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Username</label>
              <input
                type='text'
                value={username}
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Mobile</label>
              <input
                type='text'
                value={mobile}
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='text'
                value={password}
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <button className='btn btn-success' style={{margin:20}}>
                Edit
              </button>
              <button className='btn btn-success'>
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>)
}