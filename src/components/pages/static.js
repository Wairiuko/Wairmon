import React, {Component} from 'react';
import '../App.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS3DObject, CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {withRouter} from 'react-router-dom';
import Emoji from './Emoji';
import {Link} from 'react-router-dom'



class Static extends Component {

  getStarted = () => {
    this.props.history.push('home')
  }

   
       componentDidMount(){
          //await this.newProject()
         var string = 
          '<div id="static">'+
              '<h1>A decentralized web app for creating all kinds of art</h1>'+
              '<h2>Built on top of the Ethereum Blockchain network</h2>'+
              '<p>W3irds art is a platform where artists who are willing to bend the rules <br></br>'+
              'join in to create rare one-of-a-kind art either collaboratively or individually. <br/>'+
              '</p>'+
              '<h2>Liberating Art through Programming</h2>'+
              '<p>Here art is more than just a png or jpg image file shown on the web. <br/>'+
              'We have given the artists the power to visualize their art the best way they can.<br/>'+
              'And that is by getting rid of all the bottlenecks of traditional/mainstream art platforms.</p>'+
              '<h2>It is All About the Art</h2>'+
              '<p>We focus not so much on the commercialization but on the art creation process.<br/>'+
              'For example we may want to see how an art piece progresses over time, not on the <br/>'+
              'provenance tree as traditional art is always about but on the creation process itself.<br/>'+
              'We want to answer when, how, what, who questions; and in that way have a greater scope <br/>'+
              'and better understanding and appreciation of the art in question.</p>'+
              '<h2>Leave A Tip if You Feel You have to</h2>'+
              '<p>The real power of art is found in its ability to move us emotionally.<br></br>'+
              'While it may not be the same for everyone, the aesthetics reached in each piece<br/>'+
              'alone is invaluable. We give you the liberty to show your appreciation by either giving a tip<br/>'+
              'to the creators, sharing the work or better yet sponsoring the continuity of the creation.<br/>'+
              'If and when the creation reaches its maturity level, the creators choose whether or not to put<br/>'+
              'it up for sale. Either way, all history is stored immutably in the blockchain including tips, <br/>'+
              'and donations. This is a great way to sponsor worth causes in the art world.</p>'+
          '</div>';
          var renderer, camera, scene, controls;
          var width = window.innerWidth;
          var height = window.innerHeight;
          var container = document.getElementById('container');
          //var cube = new THREE.BoxGeometry(20, 14, 20, 5, 3, 5)
          var cube2 = new THREE.SphereGeometry(700,36,36)
          //var cube3 = new THREE.TorusGeometry()
          var sides = [];
          
          //var divCount = 0;
          function init(){
            renderer = new CSS3DRenderer();
            renderer.setSize(width, height);
            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.top = 0;
            renderer.domElement.style.backgroundImage = // eslint-disable-next-line
            "url(" + `/screens/starry_background.jpg` + ")";
            container.appendChild(renderer.domElement)
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, width/height, 1, 1100)
            //camera = new THREE.OrthographicCamera(-width, width, height, -height, -10000, 10000 )
            camera.position.x = 0;
            camera.position.y = 200;
            camera.position.z = 1000;
            camera.lookAt(scene.position);
           
            controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;

            var clone = createCSS3DObject(string);
            clone.position.set(1, 1, 1);
            //clone.scale(1, -1, 1);
            scene.add(clone);
            createSides(string, cube2);
            animate();
            //window.addEventListener('resize', onWindowResize, false);
            //container.addEventListener('resize', onWindowResize, false);
          }
          function createCSS3DObject(s){
            var div = document.getElementById('static');
            div.innerHTML = s;
            
            div.style.width = '1000px';
            div.style.height = '1000px';
            div.style.opacity = .9;
            //div.style.backgroundColor = "#000000";
            div.style.textAlign = "center";
            div.style.color = "#FAFAFA";
            var object = new CSS3DObject(div)
            return object;
          }
          
        
          function createCSS3DImage(i){
            var div = document.createElement('div');
            var img = document.createElement('img');
            
            var nrString = ('000' + i * 4).substr(-3, 3);
            
            img.src = "/screens/w3artproject-"+ nrString + ".png";
            img.width = 140;
            img.alt = ""

            //div.style.opacity = 0.7;
            //div.style.width = '2100px';
            //div.style.height = '2000px';

            div.appendChild(img);

            var object = new CSS3DObject(div);
            object.name = 'image_test';
            return object;
          }
          function createSides(i, geometry) {

            // merge these, or compensate the offset
            for ( i = 0 ; i < geometry.faces.length; i += 2) {
    
                // create a new object
                var side = createCSS3DImage(i);
    
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
        
          function onWindowResize(){
            camera.aspect = width/height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height)
          }
          
          function animate(){
            controls.update();
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
          }
          init();
          window.addEventListener('resize', onWindowResize, false);
            //container.addEventListener('resize', onWindowResize, false);
          
      }

    render(){
        return(
            <>
            <div id = 'container'>
              <div id="img"></div>
              <div id="static"></div>
            </div>
            {this.props.needWeb3 ? <div style={{position: 'absolute', top: 0, textAlign: 'center', width: '100%'}}><h3><Emoji symbol="👋"/>Hi there! Please use a Web3 enabled browser to interact with this site<Emoji symbol="😊"/></h3><h5>Wait, you can create a <Link to='project'>project here</Link> and get the hang of it<Emoji symbol="😊"/></h5></div> : <span></span>}
            {this.props.isLoggedIn ? <span></span> :<div style={{position: 'absolute', bottom: 210, justifyContent: 'center', textAlign: 'center', width: '100%'}}>
              <button className="btn-dark" onClick = {this.props.connectWeb3}>Get Started</button>
              <br/>
            </div>
           }
            </>
        )
    } 
}
export default withRouter(Static);