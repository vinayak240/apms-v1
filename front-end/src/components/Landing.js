import React, {Component} from 'react';
import NavBar from './NavBar';
import Axios from 'axios';
import API_URL from '../api_url';
import '../css/Landing.css';

class Landing extends Component{


  state = {
    all_activities:[],
    loading:true
}

  async componentDidMount(){
    // get all activities..
    let response = await Axios.get(API_URL['all_activities']);
    if(response.data.success){
      let list = response.data.activities.filter(a => a.bookmarked);
        this.setState({
            all_activities: [...list],
            loading: false
        });
    } else {
            alert(response.data.msg);
    }
}


handleViewRoute = (id) => {
  this.props.history.push(`/activity/${id}`)
}


  handleAuthRoute = (id) => {
    window.location.href += 'profile';
  }

  handleLogOutRoute = () => {
    this.props.history.push('/');
  }



  render(){
    return (
      <div className = 'Landing '>
        <NavBar handleAuthRoute = {this.handleAuthRoute} handleLogOutRoute = {this.handleLogOutRoute}/>
        

       {/* <div className = 'display-4 fw-700 text-white text-center'>
        Top activities
       </div> */}

      <div id='stars2'></div>
              <div id='stars3'></div>
              <div id='title'>
                <span>
                  Top activities
                </span>
              </div>
        <div className = 'mt-3'>
       {
         this.state.all_activities.map(a => (<>
          <div key = {a._id} class="card text-center w-50 mt-2" style={{opacity:0.9}}>
            <div style = {{backgroundColor: '#2C3E50', color : 'white' , borderColor:'#2C3E50'}} className = 'card-header p-1'>
            <h5>{a.name}</h5>        
            </div>
              <div class="card-body p-1">
                <p class="card-text">{a.desc}</p>
                <span style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {() => this.handleViewRoute(a._id)} class="btn">View details</span>
              </div>
        </div>
         </>))
       }
        </div>

      </div>
    )
  }
}

export default Landing;