import React, {Component} from 'react';
// import jwt_decode from 'jwt-decode';
import axios from 'axios';
import API_URL from '../api_url';
import '../css/Login.css';
class Login extends Component{

    state = {
        username: "",
        password: ""
    }

    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    onSubmit = async (e) => {
      e.preventDefault();
      let response = await axios({
        method: 'post',
        url: API_URL['login'],
        headers: {},
        data: this.state

      });
      
         // console.log((response));

         if(response.data.success){    
          window.localStorage.setItem('user', response.data.token);
          this.props.handleAuthRoute(response.data.user.id);
      } else {
          alert(response.data.msg);
      }

        }

  render(){
    return (
      <div className = 'Login container'>
              <form onSubmit = {this.onSubmit}>
                  <div className="form-group">
                                  <label htmlFor = 'username'>USN: </label>
                                  <input
                                  className = 'form-control' 
                                  id = 'username'
                                  type='text' 
                                  name='username' 
                                  placeholder = "eg. 1BYxxCSxxx"
                                  onChange = {this.onChange} 
                                  value = {this.state.username} />
                    <small id="emailHelp" className="form-text text-muted">Enter your university seat no.</small>
                  </div>
                  <div className="form-group">
                  <label htmlFor = 'password'>Password: </label>
                                  <input
                                  className = 'form-control' 
                                  id = 'password'
                                  type='password' 
                                  placeholder = 'Password'
                                  name='password' 
                                  onChange = {this.onChange}
                                  value = {this.state.password} />
                  </div>
                  <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} type="submit" className="btn btn-block">Login</button>
              </form>
      </div>
    )
  }
}

export default Login;