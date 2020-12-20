import React, { Component, useRef, useState, useMemo } from 'react';
import W3arts from '../abis/W3arts.json';
import { Canvas,  useFrame } from "react-three-fiber";
import * as THREE from "three";
//import GLTFLoader from "three";
import Info from './Info';
//import Body from './Body';
import Web3 from 'web3';
import './App.css';
import five from "./models/five.png";
//import domegltf from "./models/dome.gltf";
//import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
//import { useGLTF } from "@react-three/drei/useGLTF";
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


const Dome = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state 
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  
  const texture = useMemo(() => new THREE.TextureLoader().load(five), []);
  
  return (
    <mesh
    {...props}
    ref={mesh}
    scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
    onClick={(e) => setActive(!active)}
    onPointerOver ={(event) => setHover(true) }
    onPointerOut = {(event) => setHover(false)}
      >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide} color={hovered ? 'hotpink' : 'orange'}>
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
}
/*const  Dome2 = (props) => { 
  const gltf = useState()
useMemo(() => new GLTFLoader().load(domegltf), [])
return gltf ? <primitive object={gltf.scene}/> : null
}*/




class ThreeD extends Component{
  async componentDidMount() {
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
    //this.Dome2 = this.Dome2.bind(this)

  }
render() {
  return (
    
    <div>
    <Info account={this.state.account}/>
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Dome position={[-1.2, 0, 0]} />
      <Dome position={[2.5, 0, 0]} />
      <Dome position={[6.2, 0, 0]} />
      
    </Canvas>

    </div>
    
  );
  }
  }
export default ThreeD;


/*export default function Model(props){
  const {nodes, materials} = useGLTF('/dome.gltf')
  return(
    <group {...props} dispose={null}>
      <group name="Camera" position={[10, 0, 50]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={nodes.Camera_Orientation}/>
      </group>
      <group name="Sun" position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={nodes.Sun_Orientation}/>
      </group>
      <group name="Cube">
        <mesh material={materials.base} />
        <mesh material={materials.inner} />
      </group>
    </group>
  )
}
useGLTF.preload('/dome.gltf')*/
