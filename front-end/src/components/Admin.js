import React, {Component} from 'react';
import StudentList from './StutdentList';
import Axios from 'axios';
import API_URL from '../api_url';
import '../css/Admin.css';




const Activities = ({all_activities, handleCreateRoute, handleUpdateRoute, handleViewRoute}) => (<>

<div className = 'card shadow-md mb-3 mt-3'>
<div className = 'card-body text-right row align-items-center'>
<div className = 'col-md-7'>
<div className = 'justify-content-even align-items-center row'>

<div className = 'col-md-5'>
<span className="card-title font-weight-bold align-self-left mr-5">Activity Information</span>
</div>
<div className = 'col-md-7'>

<span style = {{backgroundColor: '#fff', color:'#2C3E50', fontWeight:600}} className = 'btn btn-link'><div className="custom-control custom-checkbox">
  <input type="checkbox" className="custom-control-input" id="customCheck1"/>
  <label className="custom-control-label" htmlFor="customCheck1">All</label>
</div></span>

<span style = {{backgroundColor: '#fff', color:'#2C3E50', fontWeight:600}} className = 'btn btn-link mx-3'><div className="custom-control custom-checkbox">
  <input type="checkbox" className="custom-control-input" id="customCheck2"/>
  <label className="custom-control-label" htmlFor="customCheck2">Completed</label>
</div></span>
</div>
</div>
</div>
<div className = 'col-md-5 text-right'>
<button  style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {handleCreateRoute} className = 'btn btn-dark mt-0'> Create Activity  <i className = 'fas fa-plus'></i></button>
</div>
</div>
</div>
    {all_activities.map(a =>(
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
      <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {() => handleUpdateRoute(a._id)} className = 'btn btn-dark mx-1'>Edit details</button>
      <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {() => handleViewRoute(a._id)} className = 'btn btn-dark mx-1'>View details</button>
         </div>
      </div>
    </div>
  </div>
      </div>
    ))}
</>
)


const Bookmark = ({all_activities, handleCreateRoute, handleUpdateRoute, handleViewRoute}) => (<>

  <div className = 'card shadow-md mb-3 mt-3'>
  <div className = 'card-body text-right row align-items-center'>
  
  <div className = ' text-left col-md-5'>
  <span className="card-title font-weight-bold ml-3"><i style = {{fontSize:'18px'}} className = 'fas fa-bookmark mx-1'></i>Bookmarked Activities</span>
  </div>

  <div className = 'col-md-7'>
  
  <span style = {{backgroundColor: '#fff', color:'#2C3E50', fontWeight:600}} className = 'btn btn-link'><div className="custom-control custom-checkbox">
    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
    <label className="custom-control-label" htmlFor="customCheck1">All</label>
  </div></span>
  
  <span style = {{backgroundColor: '#fff', color:'#2C3E50', fontWeight:600}} className = 'btn btn-link mx-3'><div className="custom-control custom-checkbox">
    <input type="checkbox" className="custom-control-input" id="customCheck2"/>
    <label className="custom-control-label" htmlFor="customCheck2">Completed</label>
  </div></span>

  </div>

  </div>

  </div>
      {all_activities.map(a =>(
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
        <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {() => handleUpdateRoute(a._id)} className = 'btn btn-dark mx-1'>Edit details</button>
        <button style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600}} onClick = {() => handleViewRoute(a._id)} className = 'btn btn-dark mx-1'>View details</button>
           </div>
        </div>
      </div>
    </div>
        </div>
      ))}
  </>
  )
  






class Admin extends Component{


    state = {
        all_activities:[],
        loading:true,
        tab:'activity'
    }

    

    async componentDidMount(){
        // get all activities..
        let response = await Axios.get(API_URL['all_activities']);
        if(response.data.success){
            this.setState({
                all_activities: [...response.data.activities],
                loading: false
            });
        } else {
                alert(response.data.msg);
        }
    }

    handleCreateRoute = () => {
        this.props.history.push('/create-activity');
    }
    handleUpdateRoute = (id) => {
      this.props.history.push(`/update-activity/${id}`)
  }

  handleViewRoute = (id) => {
    this.props.history.push({pathname:`/activity/${id}`, state:{from: this.props.location.pathname}})
}

handleTabs = (e) => {
  // console.log(e);
  this.setState({
    tab:e
  });
}


  render(){
    return (
      <div className = 'Admin'>
    
    <div class="main-act mb-5 card shadow-md">
                    <div style = {{backgroundColor:'#2C3E50', color:'white'}} class="card-header px-5 pt-4">
                      <ul class="nav nav-tabs card-header-tabs">
                        <li onClick = {() => this.handleTabs('activity')} id='activity' class="nav-item">
                          <span class={` pb-2 nav-link ${(this.state.tab === 'activity')? 'active' : ''}`} >Activities</span>
                        </li>
                        <li onClick = {() => this.handleTabs('student')} id='student' class="nav-item">
                          <span class={` pb-2 nav-link ${(this.state.tab === 'student')? 'active' : ''}`} >Students</span>
                        </li>
                        <li onClick = {() => this.handleTabs('bookmark')} id='bookmark' class="nav-item">
                          <span class={` pb-2 nav-link ${(this.state.tab === 'bookmark')? 'active' : ''}`}>Bookmarked Activities</span>
                        </li>
                      </ul>
                    </div>
                    <div class="card-body">

                     { 
                       (this.state.tab === 'activity')
                       ? <Activities 
                          handleViewRoute = {this.handleViewRoute} 
                          handleUpdateRoute = {this.handleUpdateRoute}
                          handleCreateRoute = {this.handleCreateRoute} 
                          all_activities = {this.state.all_activities} />
                       : (this.state.tab === 'student')
                          ? <StudentList />
                          : (this.state.tab === 'bookmark')
                            ? <Bookmark 
                              handleViewRoute = {this.handleViewRoute} 
                              handleUpdateRoute = {this.handleUpdateRoute}
                              handleCreateRoute = {this.handleCreateRoute} 
                              all_activities = {this.state.all_activities.filter(a => a.bookmarked)} />
                            :<></>
                     }
                  
                    </div>
                  </div>
    
      </div>
    )
  }
}

export default Admin;