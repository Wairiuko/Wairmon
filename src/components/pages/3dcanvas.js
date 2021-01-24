import * as THREE from 'three';
import React, {Component} from 'react';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { Vector3 } from 'three';
//import kloppen from '../../kloppenheim_02_4k.jpg';
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
    //I wanna see the energy usage of CSS3DRender
    //as well as the data saving capabilities
    componentDidMount(){
        var renderer, camera, scene, controls;
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        var container = document.getElementById('container');
        var img = new Image();
        var sides = [];
        var cube2 = new THREE.SphereGeometry(700,12,12);

        var string = '<canvas id="test-canvas"></canvas>'

        function init(){
            renderer = new CSS3DRenderer();
            renderer.setSize(width, height);
            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.top = 0;
            renderer.domElement.style.backgroundImage = // eslint-disable-next-line
            "url(" + `/screens/starry_background.jpg` + ")";
            container.appendChild(renderer.domElement);

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, width/height, 1, 1100)
            //camera = new THREE.OrthographicCamera(-width, width, height, -height, -10000, 10000 )
            camera.position.x = 0;
            camera.position.y = 200;
            camera.position.z = 1000;
            camera.lookAt(scene.position);
           
            controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;

            var can = createCSS3DCanvas();
            can.position.set(1,1,1);
            scene.add(can)

            //createSides(string, cube2)
            animate()
            window.addEventListener('resize', onWindowResize, false)
        }
        function createCSS3DCanvas(canvas){
            var div = document.createElement('div');
            //div.innerHTML = i;
            
            canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 960;
            canvas.height = 540;
            if (localStorage.getItem("imgCanvas")!= null){
                img.onload = function() {
                    ctx.drawImage(img, 0, 0);
                }
                img.src = localStorage.getItem("imgCanvas");
            } 
            div.appendChild(canvas)
            var object = new CSS3DObject(div);

            return object;
        }
        function createSides(i, geometry) {

            // merge these, or compensate the offset
            for ( i = 0 ; i < geometry.faces.length; i += 2) {
    
                // create a new object
                var side = createCSS3DCanvas(i);
    
                // get this face and the next which both make the cube
                var face = geometry.faces[i];
                var faceNext = geometry.faces[i+1];
    
                // First reposition the div elements based on the two faces
                // that make up the side of the cube
                //console.log(face);
                var centroid = new THREE.Vector3();
                centroid.copy( geometry.vertices[face.a] )
                        .add( geometry.vertices[face.b] )
                        .add( geometry.vertices[face.c] )
                        .add( geometry.vertices[faceNext.a] )
                        .add( geometry.vertices[faceNext.b] )
                        .add( geometry.vertices[faceNext.c] )
                        .divideScalar( 6 );
    
                side.position.x = centroid.x;
                side.position.y = centroid.y;
                side.position.z = centroid.z;
    
                // Now we need to rotate the div to the correct position
                var up = new THREE.Vector3(0,0,1);
                var normal = geometry.faces[i].normal;;
    
                // We calculate the axis on which to rotate by
                // selecting the cross of the vectors
                var axis = new THREE.Vector3();
                axis.crossVectors(up,normal);
    
                // based on the axis, in relation to our normal vector
                // we can calculate the angle.
                var angle = Math.atan2(axis.length(), up.dot(normal));
                axis.normalize();
    
                // now we can use matrix function to rotate the object so
                // it is aligned with the normal from the face
                var matrix4 = new THREE.Matrix4();
                matrix4.makeRotationAxis(axis,angle);
    
                side.rotation.setFromRotationMatrix(matrix4);
                scene.add(side);
                sides.push(side);
            }
            
        }
        
        function animate(){
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        function onWindowResize(){
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
        }
    init();
    }
 /*
    componentDidMount(){
        var renderer, camera, geometry, texture, mesh, scene, controls ;
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        //var size = 256;
        var container = document.getElementById('container');
        var can = document.getElementById('canvas2d');
        //can.width = can.height = size;
        //var ctx = can.getContext('2d');

        
        function init(){
            /***************** Fetches the 2D canvas and uses it as Texture 
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
            controls.autoRotate = true;
            camera.position.z = 500;
            controls.update(); 
            /******************************************************************** 
            /********************BACKGROUND TEST 
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
            

            /********************************* 

        }
        function onWindowResize(){
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
        }
        function animate(){
            requestAnimationFrame(animate);

            
            //controls.update();
            texture.needsUpdate = true;
            mesh.rotation.y = -.1;
            renderer.render(scene, camera)
        }

        init();
        animate();
    
}
*/   

    render() {
        
        return <div style={style} ref={ref => {this.mount = ref}} id="container"><div id="can3"></div></div>
                
                
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
                    {isMounted && <small>Tip: Drag and Drop a 360˙ Photo to change the background, 
                    Scroll to Zoom, Drag to Rotate, 
                    Shift+Drag to Pan</small>}
                    
                    {isMounted && <Scene/>}
                </>  
        )
    }
}
export default ThreeD;