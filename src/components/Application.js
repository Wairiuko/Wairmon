import React from 'react';

//import W3arts from '../abis/W3arts.json'

//import {Link} from 'react-router-dom'
//import Web3 from 'web3';
//import loader from '../loading.gif';
//import Body from "./Body";
//import Home from "./pages/Home"
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import Static from './pages/static';
import Home from './pages/Home';
//import Artwork from './pages/Artwork';
import Project from './pages/project';
//import ProjectForm from './pages/Form';
//import Box from '3box';
//import Emoji from './pages/Emoji';
//import {ThemeProvider} from 'styled-components';
//import GlobalStyles from './pages/globalStyles';
//import {lightTheme, darkTheme} from  './pages/Themes';

//import { CullFaceNone } from 'three';
//const Box = require('../lib/3box.min.js')
 

class App extends React.Component {


state = {
    isLoggedIn: false,
    needWeb3: false
  }

async componentDidMount(){
  await this.determineWeb3();
}

async determineWeb3(){
  if(typeof window.ethereum === 'undefined'){
    this.setState({ needWeb3: true })
  }
  if(window.localStorage.getItem('login') != null){
    this.setState({ isLoggedIn: true })
  }
  
}





  render() {
    if(this.state.needWeb3){
      return (
      <>
      <Switch>
        <Route exact path='/' render={props => (
          <React.Fragment>
            <Static
              needWeb3 = {this.state.needWeb3}
              />
          </React.Fragment>
        )}
      ></Route>
      <Route exact path="/project" component={Project}></Route>
      </Switch>
      </>
      )
      
    }



    return (
      
      <>
      
       
        {//this.state.loading ?<div id="loader"><img alt="Loading..." src={loader}/></div>
            //:
            <>
            
            <Switch>{/*Decides which component to show*/}
              {/*<Redirect exact from="/" to="/home" />*/}
               
                <Route exact path={['/']} render={props =>(
                  <React.Fragment>
                {this.state.isLoggedIn ? <Redirect exact to='/art'/> :
                
                <Static/>
                
                  }
              </React.Fragment>
                )}>
                  
                </Route>
                
                {this.state.isLoggedIn &&  (
                  <>
                  <Route  exact path='/art' render={props => (
                  <React.Fragment>
                    <Home
                    //loading = {this.state.loading}
                    isLoggedIn = {this.state.isLoggedIn}
                    />
                  </React.Fragment>
                )}></Route>
                   <Route exact path='/static' render={props =>(
                  <React.Fragment>
                    <Static
                    isLoggedIn = {this.state.isLoggedIn}
                    />
                  </React.Fragment>
                )}></Route> 
                {
                  //<Route path='/artwork' component={Artwork}></Route>
                 <Route exact path='/project' component={Project}></Route>
                    //<React.Fragment>
                     //</React.Fragment> <Project
                    //  isLoggedIn = {this.state.isLoggedIn}
                    //  />
                   // </React.Fragment>
                 // )}></Route>
                /*
                <Route exact path='/project/:title' render={props => (
                  <React.Fragment>
                  <Project
                  isLoggedIn = {this.state.isLoggedIn}
                  />
                  </React.Fragment>
                )}></Route> */
                }
  
                </>
                )} 
                
                
            </Switch>
            
           </>
           
    }
       
  
      
  
  </>
    );
  }
}

export default App;