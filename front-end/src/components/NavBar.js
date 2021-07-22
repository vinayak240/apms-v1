import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import jwt_decode from 'jwt-decode';
import '../css/NavBar.css';
class NavBar extends Component {
    
    state = {
        isLogged: false,
        isRegister:false
    }

    componentDidMount(){
        let isLogged = (window.localStorage.getItem('user')) ? true : false;
        let usn = '';
        if(isLogged)
         usn = jwt_decode(window.localStorage.getItem('user')).data.username;

         this.setState({
            isLogged:isLogged,
            usn:usn
         });

    }

    handleLogin = () => {
        this.setState({
            isRegister:false
        });
    }

    handleRegister = () => {
        this.setState({
            isRegister:true
        });
    }

    handleLogOut = () => {

      window.localStorage.removeItem('user');

      this.setState({
          isLogged:false
      });

      this.props.handleLogOutRoute();
  }


  render(){
    return (
      <div className="NavBar">
        <nav style = {{backgroundColor: '#2C3E50'}} className="navbar sticky-top navbar-expand-lg navbar-dark">
          <span className="navbar-brand"><span className = 'side-logo'>AP</span> MS</span>
          <button
          style = {{backgroundColor : '#2c3e50',color: 'white'}}
            className="navbar-toggler p-2 px-3"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            
            {/* <span className="navbar-toggler-icon">
            </span> */}
            <i className="fas fa-bars"></i>

          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active nav-ele">
                <span onClick = {()=>this.props.handleLogOutRoute()} className="nav-link">
                  Home <span className="sr-only"></span>
                </span>
              </li>
            { 
            (!this.state.isLogged)
            ? <> <li className="nav-item nav-ele active">
                <span className="nav-link" data-toggle="modal" data-target="#exampleModalCenter" onClick = {this.handleLogin}>Login</span>
              </li>
              <li className="nav-item nav-ele active nav-active-ele">
                <span className="nav-link px-3" data-toggle="modal" data-target="#exampleModalCenter" onClick= { this.handleRegister} >Sign up</span>
              </li> </>
            :  <li className="nav-item nav-active-ele active dropdown">
            <span className="nav-link dropdown-toggle px-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.usn}
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <span onClick = {this.handleLogOut} className="dropdown-item">Log out</span>
              <span onClick = {this.props.handleAuthRoute} className="dropdown-item">Profile</span>

            </div>
          </li>

              }
            </ul>
          </div>
        </nav>



        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">{( (this.state.isRegister)?' Student Sign Up ':' Student Login')}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {
                    (this.state.isRegister)
                    ? <Register handleAuthRoute = {this.props.handleAuthRoute} />
                    :<Login handleAuthRoute = { this.props.handleAuthRoute}/>
                }
            </div>
            </div>
        </div>
        </div>

      </div>
    );
  }
}

export default NavBar;
