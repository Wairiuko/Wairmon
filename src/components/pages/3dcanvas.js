import * as THREE from 'three';
import React, {Component} from 'react';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from 'three';
import kloppen from '../../kloppenheim_02_4k.jpg';
//import { PMREMGenerator } from '../js/PMREMGenerator.js';
//import { PMREMCubeUVPacker } from '../js/PMREMCubeUVPacker.js';
//import {WebGL } from '../js/WebGL.js';
//import dat from 'three/examples/js/libs/dat.gui.min';
//import 'three/examples/js/libs/dat.gui.min.js';
//import Stats from 'three/examples/js/libs/stats.min';
//import  * as Sky from "three/examples/jsm/objects/Sky";
//import "three/examples/js/objects/Sky.js";
//import * as THREE from 'three';

// global variables

const style ={ height: 540, width: 960};

class Scene extends React.Component{
 
    componentDidMount(){
        var renderer, camera, geometry, texture, mesh, scene, controls, backmesh ;
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        //var size = 256;
        var container = document.getElementById('container');
        var can = document.getElementById('canvas2d');
        //can.width = can.height = size;
        //var ctx = can.getContext('2d');

        
        function init(){
            /***************** Fetches the 2D canvas and uses it as Texture */
            renderer = new THREE.WebGLRenderer({antialias : true});
            
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1100);
            camera.position.z = 400;
            //camera.target = new THREE.Vector3(0, 0, 0);
            scene.add(camera);

            texture = new THREE.Texture(can);
            var material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
            geometry = new THREE.BoxGeometry(720, 405, 2);
            mesh = new THREE.Mesh( geometry, material);
            //material.opacity = 1;
            scene.add(mesh);

            controls = new OrbitControls(camera, renderer.domElement);
            camera.position.z = 500;
            controls.update(); 
            /******************************************************************** */
            /********************BACKGROUND TEST */
            var backgeometry = new THREE.SphereBufferGeometry(500, 60, 40);
            backgeometry.scale(-1, 1, 1);
            var backtexture = new THREE.TextureLoader().setCrossOrigin("anonymous").load(`${kloppen}`);
            var mat = new THREE.MeshBasicMaterial({map: backtexture});
            var backmesh = new THREE.Mesh(backgeometry, mat);
            scene.add(backmesh);
            
            
            //
            container.addEventListener( 'dragover', function ( event ) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
            }, false );
            container.addEventListener( 'dragenter', function () {
                container.style.opacity = 0.5;
            }, false );
            document.addEventListener( 'dragleave', function () {
                container.style.opacity = 1;
            }, false );
            container.addEventListener( 'drop', function ( event ) {
                event.preventDefault();
                var reader = new FileReader();
                reader.addEventListener( 'load', function ( event ) {
                    mat.map.image.src = event.target.result;
                    mat.map.needsUpdate = true;
                }, false );
                reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
                container.style.opacity = 1;
            }, false );
            //
            window.addEventListener( 'resize', onWindowResize, false );
            

            /********************************* */

        }
        function onWindowResize(){
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
        }
        function animate(){
            requestAnimationFrame(animate);

            
            
            texture.needsUpdate = true;
            mesh.rotation.y = -.1;
            renderer.render(scene, camera)
        }

        init();
        animate();
    
}
   

    render() {
        
        return <div style={style} ref={ref => {this.mount = ref}} id="container"></div>
                
                
        };
};

class ThreeD extends Component{
    state={isMounted:true}

    render(){
        const {isMounted= true} = this.state
        return(
                <>
                 
                    <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
                            {isMounted ? "Close" : "Launch"}
                            </button>
                    {isMounted && <small style={{color: 'black'}}>Tip: Drag and Drop a 360˙ Photo to change the background, 
                    Scroll to Zoom, Drag to Rotate, 
                    Shift+Drag to Pan</small>}
                    
                    {isMounted && <Scene/>}
                </>  
        )
    }
}
export default ThreeD;