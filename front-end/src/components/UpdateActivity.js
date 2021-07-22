import React, {Component} from 'react';
import '../css/CreateActivity.css';
import Axios from 'axios';
import API_URL from '../api_url';
class UpdateActivity extends Component{


    state = {
        id:'',
        n_img:0,
        name: '',
        images: [],
        point: '',
        hours: '',
        desc: '',
        students: [],
        isList:false,
        student_list:[],
        old_students:[],
        completed:[],
        old_completed:[]
    }


    async componentDidMount(){
            const id = this.props.match.params.id;
            const url = `${API_URL['id_activity']}${id}/`;
            let response = await Axios.get(url);

            if(response.data.success){
                let list = response.data.activity.students.map(id => {
                    let obj = {_id:id};
                    return obj;
                });
                let completed_list = response.data.activity.completed.map(id => {
                    let obj = {_id:id};
                    return obj;
                });
                this.setState({
                    id:response.data.activity._id,
                    name:response.data.activity.name,
                    images:response.data.activity.images,
                    point:Number(response.data.activity.point),
                    hours:Number(response.data.activity.hours),
                    desc:response.data.activity.desc,
                    students:list,
                    n_img:response.data.activity.images.length,
                    old_students:response.data.activity.students,
                    completed:[...completed_list],
                    old_completed:response.data.activity.completed
                });
            } else {
                alert(response.data.msg);
            }


    }

    onChange = (e) => {

        if(e.target.name === 'img'){
            let arr = this.state.images;
            arr[Number(e.target.id[3])] = e.target.value;
            this.setState({
                images:[...arr] 
            });
        } else {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    }

    getStudents = async () => {
        let response = await Axios.get(API_URL['student_list']);

        this.setState({
            student_list:[...response.data.list],
            isList: true
        })
    }

    getInvolvedStudents = async () => {
    
        let promises = this.state.students.map(s => {
            let response = Axios.get(`${API_URL['student_list']}${s._id}/`);
            return response;
        });

        let responses  = await Promise.all(promises);
        
        let list = responses.map(r => r.data.user);
        this.setState({
            student_list:[...list],
            isList: true
        });
        
    }

    handleCheck = (e) => {
        if(e.target.checked){
            let obj = {_id: this.state.student_list[Number(e.target.id)]._id};
            let arr = this.state.students;
            arr.push(obj);
            this.setState({
                students:[...arr]
            });
        } else {
            let id = this.state.student_list[Number(e.target.id)]._id;
            let idx = this.state.students.findIndex((val) => val._id === id);
            let arr = [...this.state.students.slice(0,idx), ...this.state.students.slice(idx+1,this.state.students.length)];
            
            let completed_arr = this.state.completed;

            let flag = completed_arr.findIndex(ele => ele._id === id);

            if(flag !== -1){
            completed_arr = [...this.state.completed.slice(0,flag), ...this.state.completed.slice(flag+1,this.state.completed.length)];

            }

            this.setState({
                students:[...arr],
                completed:[...completed_arr]
            });
        }
    }

    handleCompleted = (e) => {

        let rgx = /(.*)-(.*)/;
        let arr = e.target.id.match(rgx);

        // let key = arr[1];
        let idx1 = arr[2];

        if(e.target.checked){

            let obj = {_id: this.state.student_list[Number(idx1)]._id};

            let arr = this.state.completed;
            arr.push(obj);

            let stud_arr = this.state.students;
            let flag = this.state.students.findIndex(ele => ele._id === obj._id);

            if(flag === -1){
            stud_arr.push(obj);
            }

            this.setState({
                completed:[...arr],
                students:[...stud_arr]
            });

        } else {

            let id = this.state.student_list[Number(idx1)]._id;
            let idx = this.state.completed.findIndex((val) => val._id === id);
            let arr = [...this.state.completed.slice(0,idx), ...this.state.completed.slice(idx+1,this.state.completed.length)];
            
            this.setState({
                completed:[...arr]
            });
        }

        
    }

    checkUser = (id) => {
        let idx = this.state.students.findIndex(ele => ele._id === id);

        let val = (idx === -1)? false : true;
        // console.log(val);
        return val;
    }

    checkCompeleted = (id) => {
        let idx = this.state.completed.findIndex(ele => ele._id === id);

        let val = (idx === -1)? false : true;
        // console.log(val);
        return val;
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let obj = {
            name:this.state.name,
            images:this.state.images,
            point:Number(this.state.point),
            hours:Number(this.state.hours),
            desc:this.state.desc,
            students:this.state.students,
            old_students:this.state.old_students,
            completed:this.state.completed,
            old_completed:this.state.old_completed
        }

        
        // console.log(obj);
        let response = await Axios({
            method:'put',
            url:`${API_URL['update_activity']}${this.state.id}/`,
            headers: {},
            data: {...obj}
        });

        if(response.data.success){
            this.setState({
                name:'',
                images:'',
                point:'',
                hours:'',
                desc:'',
                students:[],
                completed:[],
                isList:false
            },() => {
                alert("SUCCESS ACTIVITY UPDATED");
            this.props.history.push('/activity/'+ this.state.id);
            });
            
        } else {
            alert(response.data.msg);
        }
    }

  render(){
    return (
      <div className = 'CreateActivity container mt-4'>
      <div className = 'card'>
      <div className = 'card-header text-center'>
        <h3> UPDATE ACTIVITY</h3>
      </div>
      <div className = 'card-body'>
        <form>
            <div class="form-group">
                <label htmlFor="name">Activity name:</label>
                <input 
                type="text" 
                class="form-control"
                id="name"
                onChange = {this.onChange} 
                value = {this.state.name} />
            </div>

  <div class="form-group">
    <label for="n_img">Select no. of images:</label>
    <select class="form-control" id="n_img" onChange = {this.onChange} value = {this.state.n_img} >
      <option>0</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  </div>


{
    Array.from({length:this.state.n_img}).map( (i,idx) => (
        <div key = {idx} class="form-group">
                <label htmlFor= {`img${idx}`}>Image {idx + 1}:</label>
                <input 
                type="text" 
                class="form-control"
                name = 'img'
                id=  {`img${idx}`}
                onChange = {this.onChange} 
                value = {this.state.images[idx]} />
            </div>
    ))
}



                      <div class="form-row">
                         <div class="form-group col-md-6">
                             <label htmlFor= 'username'>Points: </label>
                                <input 
                                className = 'form-control'
                                type = 'number' 
                                onChange = {this.onChange} 
                                id='point'
                                value = {this.state.point} />

                     </div>
                    <div class="form-group col-md-6">
                    <label htmlFor= 'password'>No. of hours: </label>
                                    <input 
                                    className = 'form-control'
                                    type = 'number' 
                                    onChange = {this.onChange} 
                                    id='hours'
                                    value = {this.state.hours} />
                    </div>
                </div>

  <div class="form-group">
    <label for="desc">Activity Description</label>
    <textarea class="form-control" id="desc" rows="8" onChange = {this.onChange} value = {this.state.desc}></textarea>
  </div>

</form>
</div>
</div>


<div className = 'student-list text-center card mt-5'>
      <div className = 'card-header text-center'>
        <h3> Student List</h3>
      </div>

    <div className = 'card-body'>
        {
            (!this.state.isList)
            ?<div className = 'text-center mt-3'>
            <h5>Update the students list for this activity</h5>
            <div className = 'row justify-content-around'>
            <button onClick = {this.getStudents} style = {{backgroundColor: '#2C3E50', fontWeight:600, color:'white'}} className = 'btn col-sm-5'>Get student list</button>
        
            <button onClick = {this.getInvolvedStudents} style = {{backgroundColor: '#2C3E50', fontWeight:600, color:'white'}} className = 'btn col-sm-5'>Get Involved students</button>
            
            </div>
            </div>
            :(
                <table class="table">
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
                        <td>
                        <div class="custom-control custom-checkbox">
                            <input checked = {this.checkUser(s._id)} onChange ={this.handleCheck} type="checkbox" class="custom-control-input" id={"" + idx}/>
                            <label class="custom-control-label" htmlFor={"" + idx}>  Involved? </label>
                            </div>
                        </td>
                        <td>
                        <div class="custom-control custom-checkbox">
                            <input checked = {this.checkCompeleted(s._id)} onChange = {this.handleCompleted} type="checkbox" class="custom-control-input" id={"completed-" + idx}/>
                            <label class="custom-control-label" htmlFor={"completed-" + idx}>  Completed? </label>
                            </div>
                        </td>

                      </tr>
                      ))
                  }
                </tbody>
              </table>
            )
        }
    </div>

    </div>

    <button onClick = {this.onSubmit} style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600, marginBottom:'50px'}} className = 'btn btn-block py-2'> Update Activity</button>

      </div>
    )
  }
}

export default UpdateActivity;