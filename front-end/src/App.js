import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Profile from './components/Profile';
import Landing from './components/Landing2';
import Admin from './components/Admin';
import CreateActivity from './components/CreateActivity';
import './App.css';
import UpdateActivity from './components/UpdateActivity';
import Activity from './components/Activity';
class App extends Component{


  render(){
    return (
      <div className = 'App'>

            <Switch>
            <Route exact path = '/' component = {Landing} />
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/admin' component = {Admin} />
            <Route exact path = '/create-activity' component = {CreateActivity} />
            <Route exact path = '/update-activity/:id' component = {UpdateActivity} />
            <Route exact path = '/activity/:id' component = {Activity} />


            
          </Switch>


      </div>
    )
  }
}

export default App;