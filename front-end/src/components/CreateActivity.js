import React, {Component} from 'react';
import '../css/CreateActivity.css';
import Axios from 'axios';
import API_URL from '../api_url';
class CreateActivity extends Component{


    state = {
        n_img:0,
        name: '',
        images: [],
        point: '',
        hours: '',
        desc: '',
        students: [],
        isList:false,
        student_list:[]
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
        });
    }
    }

    getStudents = async () => {
        let response = await Axios.get(API_URL['student_list']);

        this.setState({
            student_list:[...response.data.list],
            isList: true
        })
    }

    handleCheck = (e) => {
        if(e.target.checked){
            let obj = {_id: this.state.student_list[Number(e.target.id)]._id};
            let arr = this.state.students;
            arr.push(obj)
            this.setState({
                students:[...arr]
            });
        } else {
            let id = this.state.student_list[Number(e.target.id)]._id;
            let idx = this.state.students.findIndex((val) => val._id === id);
            let arr = [...this.state.students.slice(0,idx), ...this.state.students.slice(idx+1,this.state.students.length)];
            
            this.setState({
                students:[...arr]
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();

        let response = await Axios({
            method:'post',
            url:API_URL['new_activity'],
            headers: {},
            data: {
                name:this.state.name,
                images:this.state.images,
                point:Number(this.state.point),
                hours:Number(this.state.hours),
                desc:this.state.desc,
                students:this.state.students
            }
        });

        if(response.data.success){
            this.setState({
                name:'',
                images:'',
                point:'',
                hours:'',
                desc:'',
                students:''
            },() => {
              alert("SUCCESS ACTIVITY CREATED");
          this.props.history.push('/activity/'+ response.data.activity._id);
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
        <h3> CREATE NEW ACTIVITY</h3>
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
            <h5>Select the students that are involved in this activity</h5>
            <button onClick = {this.getStudents} style = {{backgroundColor: '#2C3E50', fontWeight:600, color:'white'}} className = 'btn px-5'>Get student list</button>
            </div>
            :(
                <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">#USN</th>
                    <th scope="col">Name</th>
                    <th scope="col">DEPT</th>
                    <th scope="col">SEM</th>
                    <th scope="col">Selected ?</th>
              
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
                            <input onChange ={this.handleCheck} type="checkbox" class="custom-control-input" id={"" + idx}/>
                            <label class="custom-control-label" htmlFor={"" + idx}>  Involved? </label>
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

    <button onClick = {this.onSubmit} style = {{backgroundColor: '#2C3E50', color:'white', fontWeight:600, marginBottom:'50px'}} className = 'btn btn-block py-2'> Create Activity</button>

      </div>
    )
  }
}

export default CreateActivity;