import React, {Component, useState, useRef} from 'react';
import '../App.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS3DObject, CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {withRouter} from 'react-router-dom';
import Emoji from './Emoji';
import Modal from 'react-bootstrap/Modal';
import {Link, useHistory} from 'react-router-dom';
import Web3Modal from 'web3modal';
import Web3 from 'web3';


export const TossModal = () => {
  //Handling modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //Handling address
  const [copy, setCopy] = useState('')
  const inputRef = useRef(null)
  function copyBoard(e) {
    inputRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopy('Copied!')
  }
  return (
    <>
    <button className="btn-dark" onClick={handleShow}>Toss A Coin</button>
    <Modal show={show} onHide={handleClose} style={{color: "black"}}>
      <Modal.Header closeButton>
        <Modal.Title>Support this project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="static">
          We recommend sending at least 0.001Eth to <form>
            <input type="text"
            ref = {inputRef}
            value = "0x20dA165deB81dBB042fE4A9d4808399eF2477c5d"
            />
          </form>
          {
            document.queryCommandSupported('copy') &&
            <div>
              <button onClick={copyBoard}>Copy</button> 
              {copy}
            </div>
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <p>Feel free to send tokens as well. Each coin tossed here will be used to support
        the vision of this project, and in particular help sustain
        <a style={{color: "grey"}} href="https://docs.google.com/document/d/1-LsYgqshsqbC2ljQwkSsEoP04-635iTYN1haiw-taI8/edit"  target="_blank" rel="noopener noreferrer"> the Regrò Project</a> by artist
        Serste in Italy. More farm projects will be launched soon.
        </p>
        <button className="btn-dark" onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
export const ModalSet = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return(
    <>
    <button className="btn-dark" onClick={handleShow}>About</button>
    <Modal show={show} onHide={handleClose} style={{color: "black"}}>
      <Modal.Header closeButton>
        <Modal.Title>A decentralized web app for creating all kinds of art</Modal.Title>
      </Modal.Header>
      <Modal.Body>{/*By tossing an artwork, you agree to showcase your art NFT in our collection and
        agree that 30% of the sale of that artwork will be used to help a farm in Italy and in Kenya
      grow trees for to increase carbon absorption in the  world*/}
      <div id="static">
              
              
              <p>We are currently in Beta testing. To support this project and 
                its core purpose explained in <a href="https://beta.cent.co/SimonSmog/" target="_blank" rel="noopener noreferrer" style={{color: "grey"}} >
                  these Cent posts</a>, please feel free to <TossModal/>.
              </p>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <a href="https://github.com/Wairiuko/w3irdsart" target="_blank" rel="noopener noreferrer" style={{color: "black"}}>View Source Code on Github </a><br/>
      | <a href="https://discord.gg/aPkUgjn2" target="_blank" rel="noopener noreferrer" style={{color: "black"}}>Get in touch on our Discord</a><br/>
        <button className="btn-dark" onClick={handleClose}>Close</button>
        {/*<button className="btn-dark">Continue</button>*/}
      </Modal.Footer>

    </Modal>

    </>
  )
}
export const GetStarted = () => {
 
  let history = useHistory();
  async function handleClick(){
    try{const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
    theme: 'dark'
  })
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  //const history = useHistory();
  //this.setState( { account: accounts[0] });
  //this.setState({ isLoggedIn: true });
  //For login **memory
  if((localStorage) != null){
    window.localStorage.setItem('login', accounts[0]);
    history.push('/art')
    window.location.reload();
  }
}catch (error){
  window.alert('Oopps there was an error connecting to your wallet'+ error)
}
  }
    
return(
  <button className="btn-dark" onClick={handleClick}>Get Started</button>
)
}


class Static extends Component {
  

  
   
       componentDidMount(){
          //await this.newProject()
         /*var string = 
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
          '</div>';*/
          var renderer, camera, scene, controls;
          var width = window.innerWidth;
          var height = window.innerHeight;
          var container = document.getElementById('container');
          //var cube = new THREE.BoxGeometry(20, 14, 20, 5, 3, 5)
          
          var sphere = new THREE.SphereGeometry(700,36,36)
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

            //var clone = createCSS3DObject(string);
            //clone.position.set(1, 1, 1);
            //clone.scale(1, -1, 1);
            //scene.add(clone);
            createSides(sphere);
            animate();
            //window.addEventListener('resize', onWindowResize, false);
            //container.addEventListener('resize', onWindowResize, false);
          }
          /*function createCSS3DObject(s){
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
          }*/
          
        
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
          function createSides(geometry) {
            //geometry = new THREE.BufferGeometry()
            
            // merge these, or compensate the offset
            for ( var i = 0 ; i < geometry.faces.length; i += 2) {
    
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
            {this.props.isLoggedIn ? <div style={{position: 'absolute', bottom: 210, justifyContent: 'center', textAlign: 'center', width: '100%'}}>
              <ModalSet/><br/>
              <Link to='art'><button className="btn-dark">Back</button></Link> </div> :<div style={{position: 'absolute', bottom: 210, justifyContent: 'center', textAlign: 'center', width: '100%'}}>
              {/*<button className="btn-dark" onClick={e =>{e.preventDefault(); this.getStarted()}}>Get Started</button>*/}
              <ModalSet/>
              <br/>
              <br/>
              <TossModal/>
              <br/>
              <br/>
              
              <GetStarted/><br/> <br/>

              <a href="https://discord.gg/aPkUgjn2" rel="noopener noreferrer"target="_blank">Discord</a><br/><a href="https://github.com/Wairiuko/w3irdsart" rel="noopener noreferrer"target="_blank">Github</a><br/><a href="https://twitter.com/simon_wairiuko" rel="noopener noreferrer" target="_blank">Twitter</a>
              {/*<button className="btn-dark">Toss A Coin</button><br/><br/>*/
              /*<ModalSet/>*/
        }
              <br/>
            </div>
           }
            </>
        )
    } 
}
export default withRouter(Static);