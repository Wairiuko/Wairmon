import React, {Component} from 'react';
import SplitPane from 'react-split-pane';
//import styles from './Editors.module.css';

import Canvas from './canvas';

import * as THREE from 'three';
//import Navbar from '../Navbar';
//import NavBottom from '../NavBottom';
import Web3 from 'web3';
import W3irdsTokens from '../../abis/W3irdsTokens.json';
//import loader from '../../loading.gif';
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import {CSS3DObject, CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {Link} from 'react-router-dom';
import {timeSince} from './time';
import {InlineInfo, InlineProfile, InlineStats } from './Inline';
import {Pen} from './Pen';
//import FileReaderExample from './multiplefiles';
//import styles from './Editors.module.css';
//import {Button, Navbar} from 'react-bootstrap';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 


/******* CREATING A PROJECT NOW COMES HERE THE ONLY CHALLENGE I HAVE IS HAVING TO LOAD BLOCKCHAIN INFO ALL OVER AGAIN and
of course building a relationship between the data and that in the blockchain */
    
class ProjectToken extends Component{

    state= {
       // loading: true,
       // w3irdsTokens: null,
       // web3: null,
       // account: '',
        buffer: null,
        keeper: null,
        //previewHash: null,
        mainHash: null,
        dataMain: []
    }
    
    createOffChainProject =  async () => {
        this.setState({ loading: true })
         //Constants for files

     // await this.fetchAccount();

       var preview;
       var address
        //let dataMain = [];
       const name = JSON.parse(localStorage.getItem('w3ird-pen-title'));
       const description = JSON.parse(localStorage.getItem('w3ird-pen-description'));
       if (localStorage.getItem('imgBack')!= null)  {
          preview = localStorage.getItem('imgBack');
       }else{
         preview = localStorage.getItem('imgCanvas');
        // window.alert('Kindly save your final drawing')
         //return
       }
       
       const html = JSON.parse(localStorage.getItem('w3ird-pen-html'));
       const js = JSON.parse(localStorage.getItem('w3ird-pen-js'));
       const css = JSON.parse(localStorage.getItem('w3ird-pen-css'));
       const date = new Date();
       const time = timeSince(date);
       const creator = JSON.parse(localStorage.getItem('w3ird-pen-artist'))
       const mainProject = this.props.w3irdsTokens.methods.tokenURI(this.props.projectID);
       fetch(mainProject).then(response => {return response.json()}).then(json =>{this.setState({dataMain: [...this.state.dataMain, json]})})
       //const dataMain = this.props.data;
        //const pen = [html, js, css];
        const data =  JSON.stringify({...this.state.dataMain, token:{title: name, creator: creator, date: time, description: description, image: preview, html: html, js: js, css: css}})
        localStorage.setItem('tokenJson', data);
        
        
        const file = Buffer.from(data);
        //console.log(file)

        //I Need a preview hash
        //const previewImage = JSON.stringify(preview)
        

        //let prevhash;
        let ipfsId
        ipfs.add(file, {progress: (prog) => console.log(`mainJason: ${prog}`)})
        .then((response) => {
            ipfsId = response.path;
            this.setState({mainHash: ipfsId})
            //console.log(this.state.mainHash)
            if(this.state.mainHash){
                //const pricetag = 3;
                //const price = this.state.web3.utils.toWei(pricetag.toString(), 'Ether');
                if(this.state.keeper != null){
                    address = this.state.keeper
                }else{
                    address = this.state.account
                }
                 
                this.state.w3irdsTokens.methods.awardProjectToken(address, `https://ipfs.io/ipfs/${ipfsId}` ).send({ from: this.state.account })
                .on('transactionHash', hash => {
                    window.alert('Project minted successfully')
                    //localStorage.clear()
                    
                })
            }
        }).catch((err) => {
            console.error(err);
            window.alert('Oopps, something went wrong, please try again')
        })
        
      }

    captureAsset =  event => {
    event.preventDefault()
   
    var pr = document.getElementById('loader')
    
  
    const file = event.target.files[0]
    
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)

      let ipfsId
        ipfs.add(this.state.buffer, { progress: (prog) => {
            console.log(`received: ${prog}`)
            
            pr.innerHTML = `Uploading... ${prog}`
        }
        })
        .then((response) => {
          console.log(response)
          ipfsId = response.path
          console.log(ipfsId)
          //this.setState({ assets: [ipfsId] })
          //id++;

            //const data = JSON.stringify({name: file.name, ipfslink: `https://ipfs.infura.io/ipfs/${ipfsId}`} );
 
            //localStorage.setItem(`asset-${file.name}`, data)
            window.confirm(`Your asset is ready, find it here: https://ipfs.io/ipfs/${ipfsId}` )

            var tB = document.getElementById('tbody');

            var tR = document.createElement('tr')

            tR.innerHTML = `<th scope="row">${file.name}</th>
                            <td id="copy" >https://ipfs.io/ipfs/${ipfsId}</td>`
            tB.appendChild(tR)

            
        }).catch((err) => {
          console.error(err)
          //this.setState({ loading: false })
        })

   
    }
  
    
    }

    //Offline test only
   async  newProject(address, uri){
        await this.fetchAccount()
        if(this.state.w3irdsTokens != null){
        this.state.w3irdsTokens.methods.awardMainProject(address, uri).send({from: this.state.account}).on('transactionHash', hash =>{
            window.alert("Project minted successfully")
        })
    }
        
    }
    

     componentDidMount(){
        var scene, camera, renderer, object;
        var width = window.innerWidth;
        var height = window.innerHeight;
       
        var container = document.getElementById('container');

    
        
        function init(){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width/height, 1, 1000);
        camera.position.x = 0;
        camera.position.y = 200;
        camera.position.z = 1000;
        //camera.target = new THREE.Vector3(0, 0, 0)
        camera.lookAt(scene.position)
        renderer = new CSS3DRenderer();
        renderer.setSize(width, height);
        renderer.domElement.style.backgroundImage = // eslint-disable-next-line
        "url(" + `/screens/starry_background.jpg` + ")";
        container.appendChild(renderer.domElement);
        container.addEventListener( 'wheel', onMouseWheel, false );
        document.addEventListener( 'keydown', onKeyDown, false);
       
        var drawingCanvas = createCSS3DCanvas();
        drawingCanvas.position.set(0, 250, 0);
        scene.add(drawingCanvas)
        
        var codeArt = createCSS3DIframe();
        codeArt.position.set(-1000, 0, 0);
        scene.add(codeArt);

        animate();
        }
        function createCSS3DCanvas(){
            var div = document.getElementById('main');

            //canvas = document.getElementById('canvas2d');
            //div.appendChild(canvas);
            object = new CSS3DObject(div);
            return object
        }
        function createCSS3DIframe(iframe){
            iframe = document.getElementById('code-004');
            object = new CSS3DObject(iframe);
            return object;
        }
      
        function onMouseWheel( event ) {
            var fov = camera.fov + event.deltaY * 0.1;
            camera.fov = THREE.Math.clamp( fov, 10, 75 );
            camera.updateProjectionMatrix();
        }
        function onKeyDown( event ) {

            const step = 10; // world units
        
            switch ( event.keyCode ) {
        
                case 68:
                    camera.position.x -= step;
                    break;
        
                case 65:
                    camera.position.x += step;
                    break;
                
                case 87:
                    camera.position.y -= step;
                    break;
                
                case 83:
                    camera.position.y += step;
                    break;
                default:
                    camera.position.x = 0;
                    break;
            }
        
        }
       
        function animate(){
            
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
            
        }
        

         init();
        //this.fetchAccount()
        
    }
    async fetchAccount(){
        const web3 = new Web3(Web3.givenProvider);
        this.setState({ web3 })
        const accounts = await web3.eth.getAccounts();
        this.setState( { account: accounts[0] });
        const netId = await web3.eth.net.getId()
        const netData = W3irdsTokens.networks[netId]
        if(netData){
        const w3irdsTokens = new web3.eth.Contract(W3irdsTokens.abi, netData.address)
        this.setState({ w3irdsTokens })
        console.log(this.state.w3irdsTokens)
        //return w3irds
        }else{
            window.alert("Oops w3irds art does not live in the current network..yet")
        }

    }
 
    
    render(){
        //const { assets: [] } = this.state
        //let assets = Array.from(this.state.assets)
        return(
            <>
            
            
           
            <InlineInfo/>
            <InlineProfile/>
            
        {/*<div className={styles.editorsTitle}>{this.props.projectTitle} {this.props.projectCreator} {this.props.projectTime} </div>*/}
            
                <SplitPane 
            style={{marginTop: "60px", overflow: "auto"}}
            split="vertical" 
            minSize='90%'
           >
                    <SplitPane split="vertical" minSize="80%">
                        <>
                    <div id="container"></div>
                    <div id="controls" style={{width: '100%', height: '100%', position: 'absolute'}}></div>
                        <Canvas/>
                    </>
                    <Pen/>
                    </SplitPane>

                    <div className="col-md-5 overflow-auto text-center" style={{ marginTop: '10px', maxHeight: '768px', minWidth: '500px' }}>
                        <div style={{textAlign: 'left'}}><Link to="art"><button className="btn-dark">Back Home</button></Link></div>
                        <div style={{textAlign: 'left'}}>
                        <form onSubmit={e => {
                                e.preventDefault();
                                //const address = this.address.value
                                //const uri = `https://ipfs.io/ipfs/Qmbjc7CpDiMjKb2Ek1nDiztzQHG8f9Ybq1dFF2J6Dsjq1F`
                                //this.transfer(this.state.account, address, 1)
                                this.createOffChainProject()
                                //this.sellProject(address, 1)
                                //this.newProject(address, uri)
                                } }
                                ><input type="text" ref={(input) => { this.address = input }} onChange={e => { e.preventDefault(); this.setState({keeper: e.target.value})}} placeholder="Keeper Address"  /><br/>
                                <button className="btn-dark" type="submit">Submit Project</button>

                            </form>
                            {/*<button className="btn-dark"
                         onClick = { (e) => {
                             e.preventDefault();
                             //this.fetchAccount();
                             this.createOffChainProject();
                         }}>submit project</button>*/
                         }</div>
                            <div id="table" style={{backgroundColor: 'dark'}} >
                               <div id="file" style={{textAlign: 'left'}}>
                                <small className="text-white">Upload files here for use in your project.<br/> </small>
                                <small className="text-danger">Kindly make sure you have copied the links and saved them locally<br/> otherwise all the data will be lost after a page refresh! <br/></small>
                                
                                <input type="file"  id="ipfsLoad" onChange={ this.captureAsset}/><br/>
                                <small id="loader"></small>
                                </div>
                                <table className="table" style={{color: 'white'}}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Ipfs Link</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">

                                    </tbody>
                                </table>
                               
                            
                            
                            </div>
                    </div>
                    
            </SplitPane>
            
            <InlineStats/>

           
            
           </>
        );
    }
}

export default ProjectToken;