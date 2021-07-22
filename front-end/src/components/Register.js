import React, { Component }  from 'react';
import axios from 'axios';
import API_URL from '../api_url';
import '../css/Register.css';
class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            username:'',
            password:'',
            email:'',
            dept:'',
            sem:''
        };
    }


    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let response = await axios({
            method:'post',
            url: API_URL['register'],
            headers: {},
            data: this.state
        });

        if(response.data.success){    
            window.localStorage.setItem('user', response.data.token);
          this.props.handleAuthRoute(response.data.user.id);

        } else {
            alert(response.data.msg);
        }
    }

    render(){

        return (
            <div className = 'Register container'>
                <form className = 'pt-2' onSubmit = {this.onSubmit}>
                     <div class="form-row">
                         <div class="form-group col-md-6">
                             <label htmlFor= 'username'>USN: </label>
                                <input 
                                className = 'form-control'
                                type = 'text' 
                                onChange = {this.onChange} 
                                id='username'
                                placeholder = 'eg. 1BYxxCSxxx'
                                value = {this.state.username} />

                     </div>
                    <div class="form-group col-md-6">
                    <label htmlFor= 'password'>Password: </label>
                                    <input 
                                    className = 'form-control'
                                    type = 'password' 
                                    placeholder = 'Min. 6 characters'
                                    onChange = {this.onChange} 
                                    id='password'
                                    value = {this.state.password} />
                    </div>
                </div>
                <div class="form-group">
                <label htmlFor= 'name'>Name: </label>
                                    <input 
                                    className = 'form-control'
                                    type = 'text' 
                                    onChange = {this.onChange} 
                                    id='name'
                                    placeholder = 'First and Last name!'
                                    value = {this.state.name} />
                </div>
                <div class="form-group">
                <label htmlFor= 'email'>Email: </label>
                                    <input 
                                    className = 'form-control'
                                    type = 'email' 
                                    onChange = {this.onChange} 
                                    id='email'
                                    placeholder = 'eg. x@____.___'
                                    value = {this.state.email} />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label htmlFor= 'dept'>Department: </label>
                                    <select className = 'form-control' id="dept" value = {this.state.dept} onChange = {this.onChange}>
                                    <option value="">Select dept</option>
                                    <option value="cse">CSE</option>
                                    <option value="ise">ISE</option>
                                    <option value="ece">ECE</option>
                                    <option value="mech">Mech</option>
                                    <option value="civil">CIVIL</option>
                                    <option value="ele">ELE</option>
                                    </select>
                    </div>
                    <div class="form-group col-md-6">
                    <label htmlFor= 'sem'>Sem: </label>
                                    <select  className = 'form-control' id="sem" value = {this.state.sem} onChange = {this.onChange}>
                                    <option value="">Select sem</option>
                                    <option value="1">1st sem</option>
                                    <option value="2">2nd sem</option>
                                    <option value="3">3rd sem</option>
                                    <option value="4">4th sem</option>
                                    <option value="5">5th sem</option>
                                    <option value="6">6th sem</option>
                                    <option value="7">7th sem</option>
                                    <option value="8">8th sem</option>
                                    </select>
                    </div>
                </div>

            <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} type="submit" class="btn btn-block">Sign Up</button>
        </form>           
   </div>
        )
    }
}

export default Register;




