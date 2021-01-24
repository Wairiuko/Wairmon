import React from 'react';
import W3irds from '../abis/W3irds.json';
//import W3arts from '../abis/W3arts.json'
import Navbar from './Navbar';
import NavBottom from './NavBottom';
//import {Link} from 'react-router-dom'
import Web3 from 'web3';
//import loader from '../loading.gif';
//import Body from "./Body";
//import Home from "./pages/Home"
import './App.css';
import Web3Modal from 'web3modal';
import { Switch, Route, Redirect } from 'react-router-dom';
import Static from './pages/static';
import Home from './pages/Home';
import Artwork from './pages/Artwork';
import Project from './pages/project';
//import ProjectForm from './pages/Form';
//import Box from '3box';
//import Emoji from './pages/Emoji';
//import {ThemeProvider} from 'styled-components';
//import GlobalStyles from './pages/globalStyles';
//import {lightTheme, darkTheme} from  './pages/Themes';

//import { CullFaceNone } from 'three';
//const Box = require('../lib/3box.min.js')
 //Declare IPFS
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

 //const ipfsClient = require('ipfs-http-client')
 //const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
 //const year = new Date().getFullYear();
// Configuration for IPFS instance
// Create IPFS instance
const ipfsConfig = {
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        //'/ip4/127.0.0.1/tcp/4003/ws/p2p/QmYfgEQ5YsaYszKKf3yf6tUJT2grjk4wKyzR2EJZeoaHvp'
        // Websocket:
         //'/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
        // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
         //'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // WebRTC:
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        //'/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        //'/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        //'/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
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
  sync: true,
  // Load only the local version of the database
  // localOnly: true,
  //Index by doc
  //indexBy: 'doc',
  // Allow anyone to write to the database,
  // otherwise only the creator of the database can write
  accessController: {
    write: ['*'],
  }
}


class App extends React.Component {


constructor(props){
  super(props)
  this.state = {
    account: '',
    w3irds: null,
    projects: [],
    completeProjects: [],
    totalSupply: 0,
    isLoggedIn: false,
    //connect: false,
    loading: true,
    needWeb3: false,
    orbitdb: null
  }
 this.connectWeb3 = this.connectWeb3.bind(this)
 this.createDbInstance = this.createDbInstance.bind(this)
}
async componentDidMount(){
  await this.determineWeb3();
}

async determineWeb3(){
  if(typeof window.ethereum === 'undefined'){
    this.setState({ needWeb3: true })
  }
  if(window.localStorage.getItem('login')){
    this.setState({ isLoggedIn: true })
  }
  
}
/*
async componentWillUnmount(){
  await window.localStorage.removeItem('login')
  this.setState({ isLoggedIn: false })
}
*/

async connectWeb3() {
  this.setState({loading: true})
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
    window.localStorage.setItem('login', this.state.account)
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

async createDbInstance() {
  
 /********Creates OrbitDB Instance */
  if(this.state.account){   
    // Create IPFS instance
    const initIPFSInstance = async () => {
      const node = await IPFS.create(ipfsConfig);
      return node 
    };
  //Orbitdb Instance
  initIPFSInstance().then(async ipfs => {
  const orbitdb = await OrbitDB.createInstance(ipfs, dbConfig);
  console.log(orbitdb)
  this.setState({orbitdb})
  /*
  // Create / Open a main keyvalue database
  const space = await orbitdb.keyvalue("web3art", dbConfig);
  await space.load();
  console.log(space)
  //this.setState({ space })
  const result = space.all
  console.log(result)
  //Create /Open docstore
  const doc = await orbitdb.docs("web3art.project", dbConfig)
  await doc.load()
  console.log(doc)
  //Events
  space.events.on('replicated', address => {
    const result = space.all
    console.log(result)
    console.log(space.iterator({limit: -1}).collect())
  })
  */    
});  
}else{
  window.alert("Error creating the database")
}
}
//Create Project => taking this function to Home component



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
      
       <Navbar account = {this.state.account}/>
        {//this.state.loading ?<div id="loader"><img alt="Loading..." src={loader}/></div>
            //:
            <>
            
            <Switch>{/*Decides which component to show*/}
              {/*<Redirect exact from="/" to="/home" />*/}
               
                <Route exact path={['/']} render={props =>(
                  <React.Fragment>
                {this.state.isLoggedIn ? <Redirect exact to='/home'/> :
                
                <Static connectWeb3 = {this.connectWeb3}/>
                
                  }
              </React.Fragment>
                )}>
                  
                </Route>
                
                {this.state.isLoggedIn &&  (
                  <>
                  <Route exact path='/home' render={props => (
                  <React.Fragment>
                    <Home
                    loading = {this.state.loading}
                    connectWeb3 = {this.connectWeb3}
                    createDbInstance = {this.createDbInstance} 
                    totalSupply = {this.state.totalSupply} 
                    projects = {this.state.projects}
                    w3irds = {this.state.w3irds}
                    orbitdb = {this.state.orbitdb}
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
                  <Route path='/artwork' component={Artwork}></Route>
                  <Route exact path='/project' render={props =>(
                    <React.Fragment>
                      <Project
                      isLoggedIn = {this.state.isLoggedIn}
                      />
                    </React.Fragment>
                  )}></Route>

                <Route exact path='/project/:title' render={props => (
                  <React.Fragment>
                  <Project
                  projects = {this.state.projects}
                  isLoggedIn = {this.state.isLoggedIn}
                  />
                  </React.Fragment>
                )}></Route>  
                </>
                )} 
                
                
            </Switch>
            
           </>
           
    }
       <NavBottom/>
  
      
  
  </>
    );
  }
}

export default App;