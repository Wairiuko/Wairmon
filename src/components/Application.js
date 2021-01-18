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
import Box from '3box';
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
    name: 'Web3Art',
    hash: 'hash',
    db: null,
    isLoggedIn : false,
    w3irds: null,
    projects: [],
    totalSupply: 0,
    //connect: false,
    loading: true,
    needWeb3: false,
    needToWeb3Browser: false,
    //space: null,
    //profile: null,
    box: null

  }

  this.connectWeb3 = this.connectWeb3.bind(this)
  this.createProject = this.createProject.bind(this)
  this.getAddress = this.getAddress.bind(this)
  //this.getSpace = this.getSpace.bind(this)
}
/*

async getAddressFromMetaMask() {
  if (typeof window.ethereum == "undefined") {
    this.setState({ needToAWeb3Browser: true });
  } else {
    window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
    const accounts = await window.ethereum.enable();
    this.setState({ accounts });
  }
}
async componentDidMount() {
  //creates an instance of 3Box
  const box = await Box.create(window.ethereum);
  await this.getAddressFromMetaMask();

  if (this.state.accounts) {
    // Now MetaMask's provider has been enabled, we can start working with 3Box
    await box.auth(['web3Art'], {
      address : this.state.accounts[0]
    })
    // Opens the space we are using for the TODO app
    const space = await box.openSpace('web3Art')
    console.log(space)
    this.setState({ space })
  }
}*/
async componentDidMount(){
  await this.connectWeb3()
  //await this.getAddress()
  //const box = Box.create();
  //await box.syncDone

  //await this.getProfile()
  //await this.getBox()
  /*const box = await Box.openBox(this.state.account, window.ethereum);
  await box.syncDone;
  const space = box.openSpace('web-three-art');
  this.setState({ space, box });
  const config = await Box.getConfig(this.state.account)
  console.log(config)*/
  //await this.connectWeb3();
  //await this.createDatabase();

  /*const box = await Box.create(window.ethereum);
  
  await this.getAddress()
    if (this.state.accounts) {
      await box.syncDone
      this.setState({ box: box })
      // Now MetaMask's provider has been enabled, we can start working with 3Box
      await this.state.box.auth(['3chat'], {
        address : this.state.accounts[0]
      })
      // Opens the space we are using for the TODO app
      const space = await this.state.box.openSpace('3chat')
      console.log(`space open`)
      this.setState({ space })
    }*/
  //this.setState({loading: false})
}
async getAddress(){
  this.setState({ loading: true })
  if (typeof window.ethereum == "undefined") {
    this.setState({ needWeb3: true });
  } else {
    window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
    const accounts = await window.ethereum.enable();
    this.setState({ account: accounts[0] });
    //const box = Box.create(window.ethereum)
    //await box.syncDone
    //this.setState({ box })
    const box = await Box.create(window.ethereum)
    const profile = Box.getProfile(this.state.account);
    //const profile = box.public.all();
    //const profile = prof.public.get('name');
    this.setState({ profile });
    console.log(profile)
    const space = box.auth(['web3Art'], {address: this.state.account}) 
    console.log(space)
    this.setState({ loading: false })
  }
}
async getProfile(){
  this.setState({ loading: true })
  //creates an instance of 3Box
  const profile = Box.get(this.state.account);
  //const profile = box.public.all();
  //const profile = prof.public.get('name');
  this.setState({ profile });
  console.log(profile)
  this.setState({ loading: false }) 
}
async getBox(){
  const box = Box.create()
  await box.syncDone
  console.log(box)
}

async connectWeb3() {
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



/*async createDatabase() {
  //const name = `Web3Art`;
  this.setState({ loading: true });
  // Create IPFS instance
  const ipfs = await Ipfs.create(ipfsConfig)
  // Create an OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs)
  
  // Open (or create) database
  const db = await orbitdb.docstore(this.state.name, dbConfig)
  console.log(db)
  await db.load();
  
  
  this.setState({ loading: false })

  // Done
  this.setState({db});

  return db;

  /*db.put({_id: 'hash', doc: 'pantheon to all art'})
  .then(() => db.put({ _id: 'content', doc: 'Serste made it'}))
  .then(() => db.get('hash'))
  .then((value) => console.log(value))
  .then(() => db.get('content'))
  .then((value) => console.log(value))
  return db;*/
  
  /**/
//}
/*createProject = (name) => {
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
}*/
async createProject(name){
  /*const existingProject = getProjectByHash(hash)
  if (existingProject) {
    //await updateProjectByHash(hash, project)
    return
  }*/
  /*this.setState({loading: true})
  const pr1 = await this.state.db.put({_id: `${this.state.hash}`, doc: `${name}`, age: 0 })
  .then(() => this.state.db.get('hash'))
  .then((value) => console.log(value))
  this.setState({loading: false})
  return pr1*/
}

//
  /*async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = W3arts.networks[networkId]
    if(networkData) {
      const w3arts = new web3.eth.Contract(W3arts.abi, networkData.address)
      this.setState({ w3arts })
      const artworksCount = await w3arts.methods.artworkCount().call()
      this.setState({ artworksCount })

      // Load artworks, sort by newest
      for (var i=artworksCount; i>=1; i--) {
        const artwork = await w3arts.methods.artworks(i).call()
        this.setState({
          artworks: [...this.state.artworks, artwork]
        })
      }

      //Set latest artwork with title to view as default 
      const latest = await w3arts.methods.artworks(artworksCount).call()
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title
      })
      this.setState({ loading: false})
    } else {
      window.alert('W3arts contract not deployed to detected network.')
    }
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }


  createArtwork = title => {
    console.log("Submitting file to IPFS...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.w3arts.methods.createArtwork(result[0].hash, title).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }
  purchaseArtwork(id, price){
    this.setState({loading: true})
      this.state.w3arts.methods.purchaseArtwork(id).send({from: this.state.account, value: price})
      .once('receipt', (receipt)=>{
        this.setState({loading: false})
      })
  }

  changeArtwork = (hash, title, description) => {
    this.setState({'currentHash': hash});
    this.setState({'currentTitle': title});
    this.setState({'currentDescription': description});
  }
  
  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      account: '',
      w3arts: null,
      artworks: [],
      loading: true,
      currentHash: null,
      currentTitle: null,
      currentDescription: null
    }

    this.createArtwork = this.createArtwork.bind(this)
    this.purchaseArtwork = this.purchaseArtwork.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.changeArtwork = this.changeArtwork.bind(this)

  }*/

  render() {
    if(!this.state.account){
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