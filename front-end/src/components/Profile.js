import React, {Component} from 'react';
import axios from 'axios';
import API_URL from '../api_url';
import NavBar from './NavBar';
import '../css/Profile.css';
class Profile extends Component{

    state = {
        user:null,
        loading: true
    }

    handleLogOutRoute = () => {
        this.props.history.push('/');
      }

      handleAuthRoute = (id) => {
        this.props.history.push('/profile');
      }
    
    
    async componentDidMount(){
        let response = await axios({
            method: 'get',
            url: API_URL['profile'],
            headers: {
                "Authorization" : window.localStorage.getItem('user')
            }
        });

        if(response.data.success){
            this.setState({
                user: response.data.user,
                loading:false
            });
        }else{
            this.setState({
                msg: response.data.msg
            });
        }
    }

    getPoints = () => {
        let tot = 0;
        const completed = new Set(this.state.user.completed);
        // for reduce method array of numvber is only compatible ...
        this.state.user.activities.forEach(element => {
            if(completed.has(element._id)) { 
               tot = tot + element.point;
        }
        });
       
        return tot;
    }

  render(){
    return (
      <div className = 'Profile'>
            <NavBar handleAuthRoute = {this.handleAuthRoute} handleLogOutRoute = {this.handleLogOutRoute}/>
            {
               (!this.state.loading)
               ?<>
                {/* <h1 className = 'text-center'>Student profile</h1> */}
                <div className = 'content row justify-content-around'> 
                {/* <h1>Points earned - {(!this.state.loading) ? this.getPoints() : 0}</h1> */}

                <div style = {{marginTop: '10px'}} className = 'profile-info card col-md-3 text-center'>
                <span className = 'profile-pic card-img-top'>{this.state.user.name.split(' ')[0][0] + '' || this.state.user.name.split(' ')[1][0]}</span>
                
                <ul className = 'list-group list-group-flush'>
                    <li className = 'list-group-item' >
                    <ul className = 'list-group list-group-flush'>
                        <li className = 'list-group-item'>{this.state.user.name}</li>
                        <li className = 'list-group-item'>{this.state.user.username}</li>
                        <li className = 'list-group-item'>{this.state.user.email}</li>
                        <li className = 'list-group-item'>{this.state.user.sem} - {this.state.user.dept} </li>

                    </ul>
                    </li>
                    <li className = 'list-group-item py-5'>
                    {/* <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600, marginBottom:'5px'}} className = 'btn btn-block'>Update info</button> */}
                    
                    </li>
                </ul>
                </div>
                {/* <div className = 'col-md-1'></div> */}
                <div style = {{boxShadow : 'none'}} className = 'activity-info col-md-8 card'>

                <div className = 'points-info'>
                <div class=" points card shadow-none mb-1">
                    <div style = {{backgroundColor:'#2C3E50', color:'white'}} class="card-header">Points earned</div>
                    <div class="card-body">
                        <h5 class="card-title">{this.getPoints()}</h5>
                    </div>
                </div>
                <div class=" points card shadow-none mb-1">
                    <div style = {{backgroundColor:'#2C3E50', color:'white'}} class="card-header">Points Total</div>
                    <div class="card-body">
                        <h5 class="card-title">100</h5>
                    </div>
                </div>
                <div class=" points card shadow-none mb-1">
                    <div style = {{backgroundColor:'#2C3E50', color:'white'}} class="card-header">Activities inv</div>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.user.activities.length}</h5>
                    </div>
                </div>
                </div>

                <div className = 'activities'>

                <div  className = 'card-header mb-5'>
                <h3 className = 'text-center'>Activities Involved</h3>
                </div>

                    {this.state.user.activities.map(a =>(
                        <div class="card shadow-sm mb-3">
                         <div className="row no-gutters mb-3">
                        {/* <img src={require("../img/cabin.png")} class="card-img" alt="..." /> */}
                        <div className="col-md-5 p-3">
                            <img src={require("../img/team.png")} className="card-img shadow-md" alt="..."/>
                        </div>
                        <div className="col-md-7">
                        <div class="card-body">
                          <h5 class="card-title">{a.name}<span style = {{marginLeft: '10px'}} className = 'badge badge-secondary'>{((new Set(this.state.user.completed).has(a._id))) ? 'Completed' : 'Not completed'}</span></h5>
                          <p class="card-text">{(a.desc.split(' ').length > 5)? a.desc.split(' ').slice(0,6).join(' ').concat(" ...") : a.desc.concat(" ...")}</p>
                          <p class="card-text"><small class="text-muted">Last updated - {`${new Date().getDate()}/ ${new Date().getMonth() + 1}/ ${new Date().getFullYear()}`}</small></p>
                          <button onClick = {() => this.props.history.push({pathname:`/activity/${a._id}`, state:{from: this.props.location.pathname}})} style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600, marginBottom:'5px'}} className = 'btn btn-block'>View details</button>
                        </div>
                        </div>
                        </div>
                      </div>
                    ))}
                </div>
                </div>

                </div>  
               </>
               : <h1>Loading</h1> 
            }
           
      </div>
    )
  }
}

export default Profile;