import React, { Component } from 'react';
//import W3arts from '../abis/W3arts.json'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import Web3 from 'web3';
//import loader from '../loading.gif';
import Body from "./Body";
//import Home from "./pages/Home"
import './App.css';
import Web3Modal from 'web3modal'
//import { CullFaceNone } from 'three';

 //Declare IPFS
 //const ipfsClient = require('ipfs-http-client')
 //const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
 const year = new Date().getFullYear();



class App extends Component {


constructor(props){
  super(props)
  this.state = {
    account: '',
    isLoggedIn : false,
    //connect: false,
    loading: true
  }

  this.connectWeb3 = this.connectWeb3.bind(this)
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
    this.setState({ isLoggedIn: true })
    
  } catch (err) {
    console.error(err);
    window.alert('Error connecting to your wallet: ' + err);
  }
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
    return (
        <div className="App">
            <Navbar account={this.state.account} connect={this.connectWeb3}  isLoggedIn = {this.state.isLoggedIn}
             />
            
        {//this.state.loading ?<div id="loader"><img alt="Loading..." src={loader}/></div>
            //:
            <Body/>
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
        
    );
  }
}

export default App;