import React, { Component } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import W3irdsTokens from '../../abis/W3irdsTokens.json';
//import {useParams} from 'react-router';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import SplitPane from 'react-split-pane';
import { CssEditor, HtmlEditor, JavascriptEditor} from "./Editors";

//import loader from '../../loading.gif';

import Navbar from '../Navbar';
import NavBottom from '../NavBottom';


export default class SingleProject extends Component{
state={
    data:[],
    loading: true,
    account: '',
    heightValue: '200px',
    project: '',
    projectTitle: null,
    projectImage: null,
    projectHtml: null,
    projectJs: null,
    projectCss: null,
    projectDescription: null,
    projectCreator: null,
    projectDate: null,
    projectOwner: null
}

async componentDidMount(){
    var camera, renderer, scene, controls;// clone;
    var container = document.getElementById('container');
    var width = window.innerWidth;
    var height = window.innerHeight;
    var codeTitle = '<h3>Code Art</h3>';
    var drawingTitle = '<h3>Drawing</h3>';
    
    function displayScene(){
    renderer = new CSS3DRenderer();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1000 );
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    renderer.setSize(width, height);
    renderer.domElement.style.backgroundImage = // eslint-disable-next-line
        "url(" + `/screens/starry_background.jpg` + ")";
    container.appendChild(renderer.domElement)
    camera.position.set(0, 200, 1000);
    camera.lookAt(scene.position);

    //clone = createCSS3DObject();
    //clone.position.set(0, 0, 0);
    //clone.rotation.set(0, -90, 0)
   // scene.add(clone)

    var codetitle = createCSS(codeTitle);
    codetitle.position.set(-1000, 300, 0)
    scene.add(codetitle)

    var drawingtitle = createCSS(drawingTitle);
    drawingtitle.position.set(0, 300, 0);
    scene.add(drawingtitle)
    
    var image = createImage();
    image.position.set(0, 0, 0);
    scene.add(image)
    /*var html = createHtml();
    html.position.set(1, 200, -500);
    html.rotation.set(45, 0, 0);
    scene.add(html)

    var js = createJs();
    js.position.set(500, 1, -500);
    js.rotation.set(0, -45, 0);
    scene.add(js)

    var css = createCss();
    css.position.set(1, -500, 1);
    scene.add(css)*/

    var iframe = createIframe();
    iframe.position.set(-1000, 0, 0);
    scene.add(iframe)
    


    animate();
    window.addEventListener('resize', onWindowResize, false);
    container.addEventListener('resize', onWindowResize, false);
    }

     function createCSS(s){
        var div = document.createElement('div');
        div.innerHTML = s;
        div.style.textAlign = 'center';
        var object = new CSS3DObject(div);
        return object;
    }
    function createImage(){
       var div = document.createElement('div');
       var imgMain = document.getElementById('image');
       div.appendChild(imgMain)
       var object = new CSS3DObject(div);
       return object;
   }
    /*function createHtml(html){
        html = document.getElementById('code-001');
        html.style.width = '480px';
        
        var object = new CSS3DObject(html);
        return object;
    }
    function createJs(js){
        js = document.getElementById('code-002');
        js.style.width = '480px';
        var object = new CSS3DObject(js);
        return object;
    }
    function createCss(css){
        css = document.getElementById('code-003');
        css.style.width = '480px';
        var object = new CSS3DObject(css);
        return object;
    }*/
     function createIframe(iframe){
        iframe = document.getElementById('code-004');
        //iframe.style.width = '480px';
        //iframe.style.height = '270px';
        var object = new CSS3DObject(iframe);
        return object;
    }

   /* function createCSS3DObject(canvas){
    var div = document.createElement('div')
    img.onload = () => {
        canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 960;
        canvas.height = 540;
        ctx.drawImage(img, 0, 0)
        div.appendChild(canvas)
    }
    img.src = jsonObject

    
     var object = new CSS3DObject(div)
     return object
    }*/
     function animate(){
        //controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    }
     function onWindowResize(){
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }
 displayScene();

 await this.connectWeb3();
}
async connectWeb3(){
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
        this.setState({account: accounts[0]})
        const netId = await web3.eth.net.getId();
        const tokenData = W3irdsTokens.networks[netId];
        if(tokenData){
            const w3irdsTokens = new web3.eth.Contract(W3irdsTokens.abi, tokenData.address);
            //const totalSupply = await w3irdsTokens.methods.totalSupply().call();
            //console.log(totalSupply)
            /*for(var t = 1; t<= totalSupply; t++){
                const tokenUris = await w3irdsTokens.methods.tokenURI(t).call();
                //console.log(tokenUris)
                fetch(tokenUris).then(
                    response => {return response.json()}
                ).then(json => {
                    this.setState({data:[...this.state.data, json]});
                    console.log(this.state.data)
            })
            }*/
            console.log(this.props.match.params);
            var id = this.props.match.params.id;
            console.log(id)
            const tokenUri = await w3irdsTokens.methods.tokenURI(id).call()
            fetch(tokenUri).then(
                response => {return response.json()}
            ).then(json => {
                this.setState({project: json})
                console.log(this.state.project)
                //this.state.project.map(project, token)
                this.setState({ projectTitle: this.state.project.project.title,
                                projectImage: this.state.project.project.image,
                                projectHtml: this.state.project.project.html,
                                projectJs: this.state.project.project.js,
                                projectCss: this.state.project.project.css,
                                projectDescription: this.state.project.project.description,
                                projectCreator: this.state.project.project.creator,
                                projectDate: this.state.project.project.date
                            })
                
                //console.log(this.state.data)
                console.log(this.state.projectTitle)
                this.setState({loading: false})
            })
            const tokenOwner = await w3irdsTokens.methods.ownerOf(id).call();
            this.setState({projectOwner: tokenOwner})
            //const project = await this.state.data.find(p => p.project.title === title);
            //this.setState({project})
          
        
        }
    }catch(error){
        window.alert('Oops error connecting to Web3' + error)
    }
}
    

    render(){
       //console.log(this.props.match.params)
        return(
            
            
            <>
        <Navbar account={this.state.account}/>
        <small className="text-white">{this.state.projectCreator} {this.state.projectDate} {this.state.projectOwner}</small>
        <nav id="prev" className="navbar navbar-dark sticky-top navbar-expand-lg  bg-dark flex-md-nowrap p-0 shadow text-monospace"> <div style={{textAlign: 'center', width: '100%'}}>{this.state.projectTitle}</div> </nav>
        <img id="image" src={this.state.projectImage}alt="Drawing"/>
        <SplitPane split="vertical" minSize="70%">
        <div id="container" ref={ref => {this.mount = ref} }></div>
       
        <>
        
        <SplitPane split="horizontal" minSize="50%" style={{overflow: 'auto'}}>
        
          <SplitPane split="vertical" minSize="50%" style={{overflow: 'auto'}}> 
        <HtmlEditor  value={this.state.projectHtml}/>
            
        <JavascriptEditor  value={this.state.projectJs} />
            </SplitPane>
            
        
        
        <div id="code-003" height={this.state.heightValue} style={{overflow: 'auto'}}>
        <CssEditor  value={this.state.projectCss} />
        </div>
        </SplitPane>
        <div id="code-004">
        <iframe srcDoc={`<html><head><style>${this.state.projectCss}</style><script type="module">${this.state.projectJs}</script></head><body>${this.state.projectHtml}</body></html>`} title="Preview" style={{width: '960px', height: '540px'}}/>
        
            
        
        </div>
        
        
        
        </>
        
        </SplitPane>
        <nav id="desc" className="navbar navbar-dark fixed-bottom navbar-expand-lg  bg-dark flex-md-nowrap p-0 shadow text-monospace"><div style={{textAlign: 'center', width: "100%"}}>{this.state.projectDescription}</div></nav>
        <NavBottom/>
            
            </>
        )
    }
}



