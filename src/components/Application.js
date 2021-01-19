import React, { Component } from 'react';
import W3irds from '../abis/W3irds.json';
//import W3arts from '../abis/W3arts.json'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import Web3 from 'web3';
import loader from '../loading.gif';
//import Body from "./Body";
//import Home from "./pages/Home"
import './App.css';
import Web3Modal from 'web3modal';
import { Switch, Route} from 'react-router-dom';
import Static from './pages/static';
import Home from './pages/Home';
import Artwork from './pages/Artwork';
import Project from './pages/project';
//import ProjectForm from './pages/Form';
//import Box from '3box';
import Emoji from './pages/Emoji';
//import { CullFaceNone } from 'three';
//const Box = require('../lib/3box.min.js')
 //Declare IPFS
 //const Ipfs = require('ipfs');
//const OrbitDB = require('orbit-db');

 //const ipfsClient = require('ipfs-http-client')
 //const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
 const year = new Date().getFullYear();
// Configuration for IPFS instance
// Create IPFS instance
/*const ipfsConfig = {
  repo: '/artwork',
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        // Websocket:
         //'/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
        // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
         //'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // WebRTC:
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
        // Use local signal server
        //'/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      ]
    },
  }
}

// Configuration for the database
const dbConfig = {
  // If database doesn't exist, create it
  create: true,
  // Don't wait to load from the network
  sync: false,
  // Load only the local version of the database
  // localOnly: true,
  //Index by doc
  //indexBy: 'doc',
  // Allow anyone to write to the database,
  // otherwise only the creator of the database can write
  accessController: {
    write: ['*'],
  }
}*/


class App extends Component {


constructor(props){
  super(props)
  this.state = {
    account: '',
    isLoggedIn : false,
    w3irds: null,
    projects: [],
    totalSupply: 0,
    //connect: false,
    loading: true,
    needWeb3: false
  }

  this.connectWeb3 = this.connectWeb3.bind(this)
  this.createProject = this.createProject.bind(this)
  
}

async componentDidMount(){
  await this.connectWeb3()
}



async connectWeb3() {
  if (typeof window.ethereum === 'undefined' ){
    this.setState({ needWeb3: true })
  }
  try{
    const providerOptions = {};
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
      theme: 'dark'
    })
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    this.setState( { account: accounts[0] });
    this.setState({ isLoggedIn: true });
    const netId = await web3.eth.net.getId()
    const netData = W3irds.networks[netId]
    if(netData) {
      const w3irds = new web3.eth.Contract(W3irds.abi, netData.address)
      this.setState({ w3irds })
      const totalSupply = await w3irds.methods.totalSupply().call()
      //console.log(totalSupply)
      this.setState({ totalSupply })
      /************Projects in Total***** */
      for (var i=1; i <= totalSupply; i++){
        const project = await w3irds.methods.projects(i-1).call()
        this.setState({
          projects: [...this.state.projects, project]
        })
        
      }
      this.setState({ loading: false })
      /********************************* */
    }else{
      window.alert("W3irds Art does not live in the detected network...yet")
      this.setState({loading: false});
    }
    
  } catch (err) {
    console.error(err);
    window.alert('Error connecting to your wallet: ' + err);
  }
}



createProject = (name) => {
  this.setState({ loading: true })
  this.state.w3irds.methods.newProject(name).send({ from: this.state.account })
  .once('receipt', (receipt)=>{
    //this.setState({ projects: [...this.state.projects, project ]}) 
  this.setState({ loading: false });
    this.props.history.push(`project/${name}`) 
}).on('error', (error) => {
  console.log(error);
  window.alert(`There was an error: ${error}`);
  this.setState({loading: false})
});
}


  render() {
    if(this.state.needWeb3){
      return <><h1><Emoji symbol="👋"/>Hi there! Please connect your wallet to continue <Emoji symbol="😊"/></h1></>
    }
    return (
      
      <>
      {this.state.loading ?<div id="loader"><img alt="Loading..." src={loader}/></div>
            :
        <div className="App">
            <Navbar account={this.state.account} profile={this.state.profile} connect={this.getSpace}  isLoggedIn = {this.state.isLoggedIn}
             />
            
        {//this.state.loading ?<div id="loader"><img alt="Loading..." src={loader}/></div>
            //:
            <Switch>{/*Decides which component to show*/}
              {/*<Redirect exact from="/" to="/home" />*/}
                <Route exact path='/' render={props => (
                  <React.Fragment>
                    <Home totalSupply = {this.state.totalSupply} projects = {this.state.projects} createProject={this.createProject} />
                  </React.Fragment>
                )}></Route>
                  <Route path='/home' render={props => (
                  <React.Fragment>
                    <Home 
                    totalSupply = {this.state.totalSupply} 
                    projects = {this.state.projects}
                    createProject = {this.createProject} />
                  </React.Fragment>
                )}></Route>
                    <Route path='/static' component={Static}></Route>
                  <Route path='/artwork' component={Artwork}></Route>
                  <Route path='/project' component={Project}></Route>
                <Route path='/project/:title' component={Project}></Route>
            </Switch>
    }
        <nav className="navbar navbar-dark fixed-bottom bg-dark flex-md-nowrap p-0 shadow text-monospace">
          <ul  className="navbar-nav px-3 text-center">
            <li  className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <span className="text-secondary">Copyright {year} W3irds Art </span>
            </li>
          </ul>
        &nbsp;
          <ul className="navbar-nav px-3 text-center">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <Link to='static'>
                <span className="text-secondary">About </span>
              </Link>
              <Link to='static'>
                <span className="text-secondary">Privacy Policy </span>
              </Link>
              <Link to='static'>
                <span className="text-secondary">Terms and Conditions </span>
              </Link>
              </li>
          </ul>
         
          
        </nav>
  
      </div>
  }
  </>
    );
  }
}

export default App;