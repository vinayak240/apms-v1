import React, {Component} from 'react';
import NavBar from './NavBar';
import Axios from 'axios';
import API_URL from '../api_url';
import '../css/Landing2.css';

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
        <div style = {{width:'100%',height:'30%'}} className = 'row mt-5'>
        <div   className = 'col-md-6'>
        <img style = {{width:'100%',height:'100%'}} src = {require('../img/svg6.png')} alt = '...'/>
        </div>
        <div className = 'col-md-6'>
       <div className = 'card shadow-none mt-4' style = {{width:'65%',margin:'auto',borderRadius: '50px',padding:'40px'}}>
       <h1 className = 'text-center'><span style = {{fontSize:'30px'}} className="navbar-brand"><span style = {{borderRight:'2px solid #18BC9C', padding:'5px'}} className = 'side-logo'>AP</span> MS</span></h1>
        <p className = 'text-center'>
            APMS stands for <span style = {{fontSize : '22px'}}>A</span>ctivity <span style = {{fontSize : '22px'}}>P</span>oints <span style = {{fontSize : '22px'}}>M</span>anagement <span style = {{fontSize : '22px'}}>S</span>ystem
            which is information management site for managing activity points consists of a Student profile where a student can manage his/her activity involvement and also consist of an Faculty Admin where the respective faculties can manage student's both activity involvement and completion.
            and APMS is built using MERN stack.
        </p>
       </div>
        </div>
        </div>

        <div className = 'display-4 text-center mt-3'> Top activities</div>

        <div className = 'container mt-3 mb-5'>

        {this.state.all_activities.map(a =>(
          <div className="card shadow-sm mb-3">
         <div className="row no-gutters mb-3">
      <div className="col-md-3 p-3">
        <img src={require("../img/team.png")} className="card-img shadow-md" alt="..."/>
      </div>
      <div className="col-md-9">
        <div className="card-body">
          <h5 className="card-title">{a.name}<span className = 'float-right'>{(a.bookmarked) ? <i style = {{fontSize:'22px', color: '#f9a602'}} className = 'fas fa-bookmark'></i> : ''}</span></h5>
          <p className="card-text">{(a.desc.split(' ').length > 5)? a.desc.split(' ').slice(0,6).join(' ').concat(" ...") : a.desc.concat(" ...")}</p>
          <p className="card-text"><small className="text-muted">Last updated - {`${new Date().getDate()}/ ${new Date().getMonth() + 1}/ ${new Date().getFullYear()}`}</small></p>
          <div className="text-right">
        <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {() => this.handleViewRoute(a._id)} className = 'btn btn-dark mx-1'>View details</button>
           </div>
        </div>
      </div>
    </div>
        </div>
      ))}

        </div>


      </div>
    )
  }
}

export default Landing;