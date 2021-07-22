import React, {Component} from 'react';

class StudentFilter extends Component{


    state = {
        pass:'',
        sem:[],
        dept:[],
        type:[]
    }

    handleChange = (e) => {
        const rgx = /(.*)-(.*)/;
        let arr = e.target.id.match(rgx);
        let key = arr[1];
        let val = arr[2];

        if(key === 'pass'){
            this.setState({
                pass:val
            });
        }else{
            if(e.target.checked){
                this.setState(st => ({
                    [key]: [...st[key], val]
                }));
            }else{
                let idx = this.state[key].findIndex(ele => ele === val);
                if(idx !== -1){
                this.setState(st => ({
                    [key]: [...st[key].slice(0,idx) , ...st[key].slice(idx+1, st[key].length)]
                }));
            }
            }

            // console.log(key,val,e.target.checked);
            
        }

    }

    handleFilter = () => {
        this.props.apply_filter(this.state);
    }

  render(){
    const dept_arr = ['cse','mech','ise','ece','civil','ele'];
    const entry_arr = ['full', 'diploma', 'coc' ];
    const pass_arr = ['both','passed','not passed'];


    return (
      <div className = 'StudentFilter w-100'>
         <div className="card border-0 shadow-none">
         <div className = 'card-body'>

         <div className = 'card-title text-center'><h3>Student filter</h3></div>


         <div className = 'passing shadow-sm card mt-2'>
            <div className = 'card-body'>
                <div className = 'card-title'> Pass status: </div>
                <hr></hr>   
                <div className = 'row justify-content-around '>
                 
                {
                    pass_arr.map( (ele,i) => (
                        <div className = ' col-md-4' key = {"pass-" + ele}>
                        <div class="custom-control custom-radio">
                            <input onChange = {this.handleChange} type="radio" id={"pass-" + ele} name="pass" class="custom-control-input"/>
                            <label class="custom-control-label" htmlFor={"pass-" + ele}>{ele.toUpperCase()}</label>
                            </div>
                        </div> 
                    ))
                }     

                </div>
                 
            </div> 
         </div>


         <div className = 'sem shadow-sm card mt-2'>
            <div className = 'card-body'>
                <div className = 'card-title'> Sem: </div>
                <hr></hr>   
                <div className = 'row justify-content-around '>
                 
                {
                    Array.from({length:8}, (ele, idx)=>idx+1).map( i => (
                        <div className = ' col-md-3'  key = {"pass-" + i}>
                        <div class="custom-control custom-checkbox text-center">
                                <input onChange = {this.handleChange} type="checkbox" class="custom-control-input" id={"sem-" + i}/>
                                <label class="custom-control-label" htmlFor={"sem-" + i}>  {i} </label>
                                </div>
                        </div> 
                    ))
                }     

                </div>
                 
            </div> 
         </div>

         <div className = 'dept shadow-sm card mt-2'>
            <div className = 'card-body'>
                <div className = 'card-title'> Department: </div>
                <hr></hr>   
                <div className = 'row justify-content-around '>
                 
                {
                    dept_arr.map( (ele,i) => (
                        <div className = ' col-md-4'  key = {"pass-" + ele}>
                        <div class="custom-control custom-checkbox text-center">
                                <input onChange = {this.handleChange} type="checkbox" class="custom-control-input" id={"dept-" + ele}/>
                                <label class="custom-control-label" htmlFor={"dept-" + ele}>  {ele.toUpperCase()} </label>
                                </div>
                        </div> 
                    ))
                }     

                </div>
                 
            </div> 
         </div>

         <div className = ' d-none type-admin shadow-sm card mt-2'>
            <div className = 'card-body'>
                <div className = 'card-title'> Type of entry: </div>
                <hr></hr>   
                <div className = 'row justify-content-around '>
                 
                {
                    entry_arr.map( (ele,i) => (
                        <div className = ' col-md-4'  key = {"pass-" + ele}>
                        <div class="custom-control custom-checkbox text-center">
                                <input onChange = {this.handleChange} type="checkbox" class="custom-control-input" id={"type-" + ele}/>
                                <label class="custom-control-label" htmlFor={"type-" + ele}>  {ele.toUpperCase()} </label>
                                </div>
                        </div> 
                    ))
                }     

                </div>
                 
            </div> 
         </div>


         <div className = 'text-right'>
                <button onClick = {this.handleFilter} className = 'btn btn-secondary'> <i className = 'fas fa-filter'></i> Apply filter</button>
            </div>

         </div>                

        </div>

      </div>
    )
  }
}

export default StudentFilter;