import React, { Component } from 'react';
import Axios from 'axios';
import API_URL from '../api_url';
import StudentFilter from './StudentFilter';
import '../css/StudentList.css';


class StudentList extends Component {

    state = {
        search_text:'',
        list:false,
        student_list:[],
        students:[],
        activities:[]
    }

   async componentDidMount(){
    
    let [response, resp_2] = await Promise.all([Axios.get(API_URL['student_list']),  Axios.get(API_URL['all_activities'])]);

    this.setState({
        list:true,
        student_list:[...response.data.list],
        students:[...response.data.list],
        activities:[...resp_2.data.activities]
    });
    }

    getAll = async () => {
        this.setState(st => ({
            search_text:'',
            student_list:[...st.students]
        }));
    }

    onChange = (e) => {

         this.setState({
            search_text: e.target.value,
            
        });

    }

    apply_filter = (query) => {
        console.log(query);
        let studs = [...this.state.students];
        const newList =  studs.filter(s => {
            let dept_flag;
            let sem_flag;
            let pass_flag;
            

            // let type_flag;
           if(query.dept.length > 0)
            {
            let dept = new Set(query.dept);
             dept_flag = dept.has(s.dept.toLowerCase());
            } else {
                dept_flag = true
            }

            if(query.sem.length > 0){
            let sem = new Set(query.sem);
            sem_flag = sem.has(s.sem);
            } else {
                sem_flag = true;
            }

            if(query.pass.length > 0 && query.pass !== 'both'){
                
               let pts = this.getPoints(s);
               pass_flag = (pts >= 100)?true:false;
               console.log(s.name ," - ",pts);
            } else {
                pass_flag = true;
            }

            if(query.pass.length > 0 && query.pass === 'not passed'){
                pass_flag = (!pass_flag)?true:false;
                
            }

            return sem_flag && dept_flag && pass_flag;

        });
        this.setState(st => ({
            student_list: [...newList]
        }));
    }

    getPoints = (s) => {
        let tot = 0;
        const completed = new Set(s.completed);
        // for reduce method array of numvber is only compatible ...
        
        this.state.activities.forEach(element => {
            if(completed.has(element._id)) { 
               tot = tot + element.point;
        }
        });
       
        return tot;
    }


    name_filter = () => {
            this.setState(st => ({
                student_list: st.student_list.filter(s => (s.username.toLowerCase().startsWith(st.search_text.toLowerCase()) || s.name.toLowerCase().startsWith(st.search_text.toLowerCase()) ))
            }));
    }

    render(){
        return (
            <div className = 'StudentList'>
                 
                <div className = 'card shadow-none border-0 mb-5'>
                {/* <div className = 'card-header text-center'>
                <h4>Student search</h4>
                </div> */}
                <div className = 'card-body p-0'>
                    <div className = 'card px-3 pt-3 mx-0 w-100'>
                        <div className = 'search row'>
                        <div  class="form-group col-sm-8">

                        <div className = 'row'>
                        <div className = 'col-sm-1 d-flex justify-content-center align-items-center p-0'>
                        <i style={{fontSize:'19px', color:'#2C3E50'}} className = 'fas fa-search'></i>
                        </div>
                        <div className = 'col-sm-11 p-0'>
                        <input onChange = {this.onChange} value = {this.state.search_text} type="text" className="form-control shadow-sm" id="search_text" placeholder="Search by USN or Name.."/>                        
                        </div>
                        </div>
                            
                        </div>
                        <div   className = 'col-sm-2'>
                        <button onClick = {this.name_filter} style = {{margin:'0px', fontWeight:600}} className = 'btn btn-block btn-success'> <i className = 'fas fa-search'></i> Search </button>
                        </div>
                        <div  className = 'col-sm-1'>
                        <button style = {{margin:'0px'}} className = 'btn btn-block btn-secondary' type="button" data-toggle="collapse" data-target="#student_filter" aria-expanded="false" aria-controls="student_filter"> <i className = 'fas fa-filter'></i> </button>        
                        </div>
                        <div  className = 'col-sm-1'>
                        <button onClick = {this.getAll} style = {{margin:'0px'}} className = 'btn btn-block btn-warning'> <i className = 'fas fa-redo-alt'></i> </button>        
                        </div>

                        <div style = {{width:'100%'}} className=" collapse" id="student_filter">
                            <StudentFilter apply_filter = {this.apply_filter}/>
                     </div>

                        </div>

                        </div>

                        <div style = {{marginTop:'30px'}} className = 'list'>
                        {
                                (!this.state.list)
                                ?<div style = {{fontWeight: 'bold'}} className = 'd-flex justify-content-center align-items-center mt-3'>
                                    <span className = 'spinner-border text-secondary' role='status'>
                                    
                                    </span>
                                    <span className = 'text-secondary ml-2'>Loading...</span>
                                </div>
                                :(
                                    <table class="table text-center border-secondary">
                                    <thead class="thead-light">
                                    <tr>
                                        <th scope="col">#USN</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">DEPT</th>
                                        <th scope="col">SEM</th>
                                        <th scope="col">Activities involved</th>
                                        <th scope="col">Activities completed</th>

                                
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
                                            <td><span className = 'badge badge-secondary p-1'>{s.activities.length}</span></td>
                                            <td><span className = 'badge badge-success p-1'>{s.completed.length}</span></td>
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
            </div>
        )
    }
}

export default StudentList;