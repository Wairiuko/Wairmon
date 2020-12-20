import React, { Component } from "react";
//import ReactDOM from "react-dom";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
//import { CubeTextureLoader, PMREMGenerator } from "three";
//import { PMREMCubeUVPacker } from "react-3d-viewer";
import './App.css';
//import App from './App.js'
//import {GltfModel} from "react-3d-viewer";
//import { render } from "react-three-fiber";
//import Info from './Info';
//import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const style = {
    height: 700, 
};

/*class OBJ extends Component {
    componentDidMount(){
        this.updateDayTime();
        this.sceneSetup();
        this.addLights();
        this.loadTheModel();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    updateDayTime () {
        var day = new Date();
        var container = document.getElementById('main-container');
		var time = day.getHours();
		console.log(time); 
		//get time
		    if (time >= '19' || time <= '6'){
					container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
				}
					else if (time === '18' || time === '7'){
						container.style.backgroundColor = 'rgba(255, 51, 0, 0.5)';

					}
				else {
					container.style.backgroundColor = 'rgba(10, 134, 236, 0.5)';

					};
					return;
				}
    

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    sceneSetup = () => {

        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            55, // fov = field of view
            width/height, //aspect ratio
            1, //near plane
            20000 //far plane
        );

        this.camera.position.set(0, -1, 0);

        this.controls = new OrbitControls(this.camera, this.mount);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        
    };

    loadTheModel = () => {

        const loader = new OBJLoader();

        loader.load(
            'dome.obj',

            (object) => {
                this.scene.add(object);

                const dm = this.scene.getObjectsByName("dome");

                dm.position.set(0, -150, 0);
                dm.material.color.set(0x50C878);
                //dm.rotation.x = 23.5;
                dm.scale.set(5, 5, 5);

                this.model = dm;
            },

            (xhr) => {
                const loadingPercentage = Math.ceil(xhr.loaded/xhr.total * 100);
                console.log((loadingPercentage)+ '% loaded');

                this.props.onProgress(loadingPercentage);
            },

            (error) => {
                console.log('An error happened:' + error );

            }
        );
    };

    

    addLights = () => {

        const lights = [];

        lights[0] = new THREE.SpotLight(0xFF7B46, 1, 0);
        lights[1] = new THREE.SpotLight(0xFF7B46, 1, 0);
        lights[2] = new THREE.SpotLight(0xFF7B46, 1, 0);

        lights[0].position.set(0, 2000, 0);
        lights[1].position.set(1000, 2000, 1000);
        lights[2].position.set(-1000, -2000, -1000);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    };

    startAnimationLoop = () => {

        if (this.model) this.model.rotation.z += 0.005;

        this.renderer.render(this.scene, this.camera);

        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    render() {
        return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}*/

class GLTF extends Component {
    componentDidMount(){
        this.updateDayTime();
        this.sceneSetup();
        this.addLights();
        this.loadTheModel();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }
    /*onWindowResize = () => { 
        camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
    }*/
    updateDayTime () {
        var day = new Date();
        var container = document.getElementById('main-container');
		var time = day.getHours();
		console.log(time); 
		//get time
		    if (time >= '19' || time <= '6'){
                    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    
				}
					else if (time === '18' || time === '7'){
						container.style.backgroundColor = 'rgba(255, 51, 0, 0.5)';

					}
				else {
					container.style.backgroundColor = 'rgba(10, 134, 236, 0.5)';

					};
					return;
				};

    sceneSetup = () => {

        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight; 
        const day = new Date();
        const time = day.getHours();
        const container = document.getElementById('main-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            55, // fov = field of view
            width/height, //aspect ratio
            1, //near plane
            1000 //far plane
        );

        this.camera.position.set(0, -1, 0);

        if (time >= '19' || time <= '6'){
            container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            this.scene.background = new THREE.Color('rgba(0, 0, 0, 0.8)');
        }
            else if (time === '18' || time === '7'){
                container.style.backgroundColor = 'rgba(255, 51, 0, 0.5)';
                this.scene.background = new THREE.Color('rgba(255, 51, 0, 0.5)');
            }
        else {
            container.style.backgroundColor = 'rgba(10, 134, 236, 0.5)';
            this.scene.background = new THREE.Color('rgba(10, 134, 236, 0.5)')
            };

        /*const loader = new THREE.TextureLoader();
        const texture = loader.load('./textures/colosseum_4k.jpg', () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(this.renderer, texture);
            this.scene.background = rt;
            
        });*/

        this.controls = new OrbitControls(this.camera, this.mount);
        this.renderer = new THREE.WebGLRenderer({ alpha:true});
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
    };

    loadTheModel = () => {
        //const renderer = new THREE.WebGLRenderer();
        //const urls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
        //const loader = new CubeTextureLoader().setPath('./textures/');
        //loader.load(urls, (texture) => {
           // var pmremGenerator = new PMREMGenerator( texture);
           // pmremGenerator.update( renderer );
           // var pmremCubeUVPacker = new PMREMCubeUVPacker( pmremGenerator.cubeLods );
           // pmremCubeUVPacker.update ( renderer );
            //var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
            var loader = new GLTFLoader();
            loader.load('dome.gltf', (gltf) =>{
                /*gltf.scene.traverse((child)=>{
                    if (child.isMesh){
                        child.material.envMap = envMap;
                    }
                });*/
                this.scene.add(gltf.scene);
            }, (xhr) => {
                const loadingPercentage = Math.ceil(xhr.loaded/xhr.total * 100);
                console.log((loadingPercentage)+ '% loaded');

                this.props.onProgress(loadingPercentage);
            },

            (error) => {
                console.log('An error happened:' + error );

            });
            //pmremGenerator.dispose();
            //pmremCubeUVPacker.dispose();
            //this.scene.background = texture;  
           // });
        };

    
    addLights = () => {

        const lights = [];

        lights[0] = new THREE.PointLight(0xFF7B46, 1, 0);
        lights[1] = new THREE.PointLight(0xFF7B46, 1, 0);
        lights[2] = new THREE.PointLight(0xFF7B46, 1, 0);

        lights[0].position.set(0, 2000, 0);
        lights[1].position.set(1000, 2000, 1000);
        lights[2].position.set(-1000, -2000, -1000);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    };

    startAnimationLoop = () => {

        if (this.model) this.model.rotation.z += 0.005;

        this.renderer.render(this.scene, this.camera);

        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    render() {
        return <div style={style} ref={ref => (this.mount = ref)} />;
    };
};
class Container extends React.Component {
    state = {isMounted: true};

    render() {
        const {isMounted = true, loadingPercentage = 0} = this.state;
        return(
            <>
            <div id ="main-container">
                
                
            <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
                {isMounted ? "Close" : "Launch"}
            </button>

            {isMounted &&<div id="info">Pantheon To All Art</div>}
            
            {isMounted && <GLTF onProgress={loadingPercentage => this.setState({loadingPercentage})}/>}
            {isMounted && <div id="stats">SERSTE  L-A FĂCUT</div>}
            {isMounted && <div id="guide">Scroll to zoom, drag to rotate</div>}
            
            </div>
            </>
            
    )
    }
}
export default Container;

/*class Container extends React.Component {
    state = {isMounted: true};

    render() {
        const {isMounted = true, loadingPercentage = 0} = this.state;
        return(
            
            <div id ="main-container">
            <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
                {isMounted ? "Unmount" : "Mount"}
            </button>
            {isMounted && <OBJ onProgress={loadingPercentage => this.setState({loadingPercentage})}/>}
            {isMounted && loadingPercentage === 100 && <div>Scroll to zoom, drag to rotate</div>}
            {isMounted && loadingPercentage !== 100 && <div>Loading Model: {loadingPercentage}%</div>}
            </div>
        )
    }
}

export default Container;*/


/*//REACT 3D VIEWER
class Reactviewer extends React.Component{
render(){
    return(
        <div>
            <GltfModel src="./models/dome.gltf"/>
        </div>
    )
}
}
export default Reactviewer;*/