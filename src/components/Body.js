import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';
import Static from './pages/static';
import Home from './pages/Home';
import Artwork from './pages/Artwork';
import Project from './pages/project';
//import App from './Application'
class Body extends Component {
  /*constructor(){
    super();
    this.state = {
      isUserAuthenticated: true
    }
  }*/
render() {
  return(
    <Switch>{/*Decides which component to show*/}
    {/*<Redirect exact from="/" to="/home" />*/}
    <Route exact path='/' component={Home}></Route>
    <Route path='/home' component={Home}></Route>
    <Route path='/static' component={Static}></Route>
    <Route path='/artwork' component={Artwork}></Route>
    <Route path='/project/:title' component={Project}></Route>
    </Switch>
  );
}
}
export default Body;
