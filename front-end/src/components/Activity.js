import React, {Component} from 'react';
import NavBar from './NavBar';
import Axios from 'axios';
import API_URL from '../api_url';

class Activity extends Component{

    static defaultProps = {
        isStudent:true
    }

    state = {
       
            id:'',
            name:'',
            images:'',
            point:0,
            hours:0,
            desc:'',
            students:[],
            isList:false,
            student_list:[],
            completed:[],
            loading:false,
            bookmarked:false
    
    }

    async componentDidMount(){
        const id = this.props.match.params.id;
        const url = `${API_URL['id_activity']}${id}/`;

        let response = await Axios.get(url);

        if(response.data.success){
            
            this.setState({
                id:response.data.activity._id,
                name:response.data.activity.name,
                images:response.data.activity.images,
                point:Number(response.data.activity.point),
                hours:Number(response.data.activity.hours),
                desc:response.data.activity.desc,
                students:response.data.activity.students,
                completed:response.data.activity.completed,
                bookmarked:response.data.activity.bookmarked
            });
        } else {
            alert(response.data.msg);
        }
      }

    
    handleLogOutRoute = () => {
        this.props.history.push('/');
      }

      handleAuthRoute = (id) => {
        this.props.history.push('/profile');
      }

    
      getInvolvedStudents = async () => {
    
        let promises = this.state.students.map(s => {
            let response = Axios.get(`${API_URL['student_list']}${s}/`);
            return response;
        });

        let responses  = await Promise.all(promises);

        // console.log(responses);
        
        let list = responses.map(r => r.data.user);
        console.log(list);
        this.setState({
            student_list:[...list],
            isList: true
        });
        
    }

    bookmark = async () => {
      let response = await Axios.post(`${API_URL['all_activities']}/${this.state.id}/bookmark/`);

      if(response.data.success){
        this.setState({
          id:response.data.activity._id,
          name:response.data.activity.name,
          images:response.data.activity.images,
          point:Number(response.data.activity.point),
          hours:Number(response.data.activity.hours),
          desc:response.data.activity.desc,
          students:response.data.activity.students,
          completed:response.data.activity.completed,
          bookmarked:response.data.activity.bookmarked
      });
      } else {
        alert(response.data.msg);
      }
    }
    

  render(){
      const img = [require("../img/cabin.png"),require("../img/cake.png"),require("../img/circus.png")];
    return (
      <div className = 'Activity'>
      {  
       (!this.state.loading)
        ? 
       
         <>
        { ((this.props.location.state && this.props.location.state.from && this.props.location.state.from === '/profile')) ? <NavBar handleAuthRoute = {this.handleAuthRoute} handleLogOutRoute = {this.handleLogOutRoute}/> : <></>}
        <div>
          <div style = {{marginTop:'25px'}} className = 'row justify-content-around m-3'>
        <div className = 'card shadow-sm col-md-5 p-3'>
        <h5 className = 'cord-title text-center'>Activity images</h5>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
            {
                img.map((i, idx) => (
                    <div key = {idx} class={`carousel-item ${(idx === 0 )?'active' : '' }`}>
                    <img src={i} className="d-block w-100" alt="..." />
                    </div>
                ))
            }
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>
        </div>
        <div className = 'card shadow-sm col-md-5 p-0 mt-2'>
                <div className = 'card-header'>
                <h3 className = 'text-center'> Activity Details</h3>
            </div>
            <div className = 'card-body'>
            <div className = 'card shadow-sm p-3 mt-2'>
            <h5><span style = {{marginLeft: '10px'}} className = 'badge badge-secondary'>Activity name</span> : {this.state.name}</h5>
            </div>
            <div className = 'card shadow-sm p-3 mt-2'>
            <h5><span style = {{marginLeft: '10px'}} className = 'badge badge-secondary'>Points rewarded</span> : {this.state.point} </h5>
            </div>
            <div className = 'card shadow-sm p-3 mt-2'>
            <h5><span style = {{marginLeft: '10px'}} className = 'badge badge-secondary'>Working hours</span> : {this.state.hours} </h5>
            </div>
            <div className = 'card row shadow-sm p-2 mt-2'>
            <div className = 'row p-0 justify-content-stretch align-items-center'>
              <div className = 'col-md-9'>
              <h5><span style = {{marginLeft: '10px'}} className = 'badge badge-secondary'>BookMarked ?</span> <span>{(this.state.bookmarked) ? 'YES' : 'NO'}</span> </h5>
              </div>
              <div className = 'col-sm-3 text-right'>
              { ((this.props.location.state && this.props.location.state.from && this.props.location.state.from === '/admin')) ?  <button onClick = {this.bookmark}  style = {{backgroundColor: '#fff', color:'#2C3E50', fontWeight:600, marginTop:'0px', fontSize:'16px'}} className = 'btn btn-outline-secondary'>{(this.state.bookmarked) ? 'Marked' : 'Mark'} <i className = {`${(this.state.bookmarked) ? 'fas' : 'far'} fa-bookmark`}></i></button> : <></>}
                           
              {/* <i className = 'text-secondary far fa-bookmark fa-2x'></i> */}
              </div> 
            </div>           
            </div>
           
           
            </div>
        </div>
        </div>
        
        <div style = {{width:'90%', margin:'auto',marginTop:'20px'}} className = 'card shadow-sm '>
        <div className = 'card-header mb-1'>
           <h3 className = 'text-center'> <span>Activity Description </span></h3>
            </div>
        <div className = 'card-body p-4 text-center'>
            
            <div className = 'card-text text-center'>
                {this.state.desc}
            </div>
        </div>

        </div>
        <div style = {{width:'90%', margin:'auto',marginTop:'20px', marginBottom:'30px'}} className = 'student-list text-center card shadow-sm  mt-5'>
      <div className = 'card-header text-center'>
        <h3> Student List</h3>
      </div>

    <div className = 'card-body'>
        {
            (!this.state.isList)
            ?<div className = 'text-center mt-3'>
            <button onClick = {this.getInvolvedStudents} style = {{backgroundColor: '#2C3E50', fontWeight:600, color:'white'}} className = 'btn'>Show Involved students</button>
            

            </div>
            :(
                <table class="table shadow-sm">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">#USN</th>
                    <th scope="col">Name</th>
                    <th scope="col">DEPT</th>
                    <th scope="col">SEM</th>
                    <th scope="col">Involved ?</th>
                    <th scope="col">Completed ?</th>

              
                  </tr>
                </thead>
                <tbody>
                  {
                      this.state.student_list.map((s, idx) => (
                        <tr key = {s._id}>
                        <th scope="row">{s.username}</th>
                        <td>{s.name}</td>
                        <td>{s.dept}</td>
                        <td>{s.sem}</td>
                        <td>Involved</td>
                        <td>{((new Set(this.state.completed).has(s._id))) ? 'Completed' : 'Not completed'}</td>
                      </tr>
                      ))
                  }
                </tbody>
              </table>
            )
        }
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

export default Activity;