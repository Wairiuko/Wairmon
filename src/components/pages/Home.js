import React, { Component } from 'react';
//import W3arts from '../../abis/W3arts.json';
//import Web3 from 'web3';
//import loader from '../../loading.gif';
import Donations from './Donations';
import { withRouter } from 'react-router-dom'
//import Project from './project'

//Declare IPFS
//const ipfsClient = require('ipfs-http-client')
//const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
//const ipfsClient = require('ipfs-http-client')
//const ipfs = new ipfsClient({host:'localhost', port: 5001, protocol:'http'});

class Home extends Component {

  constructor(props){
    super(props)

    this.createRoom = this.createRoom.bind(this)
  }
   async createRoom(title) {
    const Room = require('ipfs-pubsub-room')
    const IPFS = require('ipfs')
    const ipfs =  await IPFS.create({ 
      EXPERIMENTAL: {
      pubsub: true
      },
      config: {
        Addresses: {
          Swarm: []
        }
      }
    })
    /*ipfs.once('ready', () => ipfs.id((err, info) => {
      if (err) {throw err }
      console.log('IPFS node ready with address ' + info.id)
    }))*/
      const room = new Room(ipfs, `${title}`)
      //console.log(`${title}`)
      this.props.history.push(`project/${title}`)
      /*room.on('peer joined', (peer) => console.log('peer' + peer + ' joined'))
      room.on('peer left', (peer) => console.log('peer' + peer + ' left'))
      //send/receive messages
      room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'))
      room.on('message', (message) => console.log('got message from ' + message.from + ':' + message.dataToString()))

      //broadcast message every 2 seconds
      setInterval(() => room.broadcast('Hey everyone!'), 2000)*/
      room.on('peer joined', (peer) => {
        console.log('Peer joined the room', peer)
      })
      
      room.on('peer left', (peer) => {
        console.log('Peer left...', peer)
      })
      
      // now started to listen to room
      room.on('subscribed', () => {
        console.log('Now connected!')
      })
    
    
  }
  /*async componentDidMount(){
    await this.loadBlockchainData();
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
      <div>
      { /*this.state.loading
        ? <div id="loader"><img alt="Loading..." src={loader}/></div>
        :*/
        <Donations
        //artworks={this.state.artworks}
        createRoom={this.createRoom}
        //captureFile={this.captureFile}
        //changeArtwork={this.changeArtwork}
        //currentHash={this.state.currentHash}
        //currentTitle={this.state.currentTitle}
        //currentDescription={this.state.currentDescription
        //}
        />
      }
      </div>
    );
  }
}

export default withRouter (Home);
