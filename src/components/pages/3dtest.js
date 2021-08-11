// 3D Test
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import React, {Component} from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {Portals} from './portals.json';
import Navbar from '../Navbar'
//import {Link} from 'react-router-dom'
//import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';



class Globe extends Component{

    state = {
        portals: '',
        portalsMap: [],
        value: 0
    }
    
    async componentDidMount(){
        var renderer, camera, scene, controls, loader, material, geometry, mesh ;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var container = document.getElementById('globecontainer');
        var nav = document.getElementById('stats');
        
        ///PORTALS 
        var portal0 = document.getElementById('0')
        var portal1 = document.getElementById('1')
        var portal2 = document.getElementById('2')
        var portal3 = document.getElementById('3')
        var portal4 = document.getElementById('4')
        //var portalButton = document.getElementById('portals')
        //var button = document.getElementById('stadium');
        //var cameraPosition
        //const portalStadium = await this.state.portals.Stadium
        //var prog = document.getElementById("prog")
        //var can = document.getElementById('canvas2d');
        //can.width = can.height = size;
        //var ctx = can.getContext('2d');
        await this.setState({portals: Portals})
            console.log(this.state.portals)
        await this.setState({portalsMap: [...this.state.portalsMap, Portals]})
            console.log(this.state.portalsMap)
            const portalStadium =  this.state.portals.Stadium
            console.log(portalStadium)
            //const portalHilltop = this.state.portals.HilltopCityview


        //console.log(this.props.match.params);
        //const name = this.props.match.params.name;
        //console.log(name)
        
        //console.log(Portals[name].name)

        //console.log(Portals[name].coord)
        //const portalValues = [0,1,2,3,4,5]
        
        var cX = Portals[0].coord.x;
        var cY = Portals[0].coord.y;
        var cZ = Portals[0].coord.z;

        
       
        function init(){
            renderer = new THREE.WebGLRenderer({antialias : true, alpha: true});
            
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            //renderer.setClearColor(0xffffff, 0)
            container.appendChild(renderer.domElement);

            //container.appendChild( VRButton.createButton( renderer ) );

            renderer.xr.enabled = true;

            
            

            scene = new THREE.Scene();
            scene.background = new THREE.Color(
                //0x3c6194
                0xcce0ff
                )
            scene.fog = new THREE.Fog( 0xcce0ff, 500, 2500 );

            camera = new THREE.PerspectiveCamera( 75, width/height, 1, 6500);
            //camera.position.set(1, 1, 10);
            //camera.fov *= zoomFactor;
            camera.updateProjectionMatrix();
            camera.position.x = cX;
            camera.position.y = cY;
            camera.position.z = cZ;
            
            //camera.lookAt(scene.position)
            //camera.rotation.set(-2.43, -1.4, -2.43)
            //console.log(camera.rotation)
            //console.log(camera.target)
            //camera.target = new THREE.Vector3(1879, 134, 259);

            scene.add(camera);

            controls = new OrbitControls(camera, renderer.domElement);
            //controls.autoRotate = true;
            controls.minDistance = 0;
            controls.maxDistance = Infinity;
            controls.target.set(1881, 143, 257)
            controls.update()
            console.log(controls.target)
            //controls.minPolarAngle = 0;

            //controls.maxPolarAngle = Math.PI;
            //controls.maxPolarAngle = Math.PI/2;

            const updateOrbit = () => {
                const forward = new THREE.Vector3(cX, cY, cZ)
                //console.log(forward)
                camera.getWorldDirection(forward);
                controls.target.copy(camera.position).add(forward);
                //console.log(JSON.stringify(camera.position))
                nav.innerHTML = `<small>Camera: ${JSON.stringify(camera.position)}</small>`
                document.body.appendChild(nav)
                
            }
            controls.addEventListener('end', () => {
                updateOrbit();
            });

            updateOrbit();

            //////PORTALS (going manual as I find a way to automate)
            const toPortalZero = () =>{
                var val0 = portal0.value;
                var c0X = Portals[val0].coord.x;
                var c0Y = Portals[val0].coord.y;
                var c0Z = Portals[val0].coord.z;

                camera.position.set(c0X, c0Y, c0Z)
                controls.target.set(1881, 143, 257)
                camera.updateProjectionMatrix();
                controls.update()
                //console.log(controls.target)
                updateOrbit();
            }
            const toPortalOne = () =>{
                var val1 = portal1.value;
                var c1X = Portals[val1].coord.x;
                var c1Y = Portals[val1].coord.y;
                var c1Z = Portals[val1].coord.z;

                camera.position.set(c1X, c1Y, c1Z)
                controls.target.set(1881, 143, 257)
                camera.updateProjectionMatrix();
                controls.update()
                //console.log(controls.target)
                updateOrbit();
            }
            const toPortalTwo = () =>{
                var val2 = portal2.value;
                var c2X = Portals[val2].coord.x;
                var c2Y = Portals[val2].coord.y;
                var c2Z = Portals[val2].coord.z;

                camera.position.set(c2X, c2Y, c2Z)
                controls.target.set(1881, 143, 257)
                camera.updateProjectionMatrix();
                controls.update()
                //console.log(controls.target)
                updateOrbit();
            }
            const toPortalThree = () =>{
                var val3 = portal3.value;
                var c3X = Portals[val3].coord.x;
                var c3Y = Portals[val3].coord.y;
                var c3Z = Portals[val3].coord.z;

                camera.position.set(c3X, c3Y, c3Z)
                controls.target.set(1881, 143, 257)
                camera.updateProjectionMatrix();
                controls.update()
                //console.log(controls.target)
                updateOrbit();
            }
            const toPortalFour = () =>{
                var val4 = portal4.value;
                var c4X = Portals[val4].coord.x;
                var c4Y = Portals[val4].coord.y;
                var c4Z = Portals[val4].coord.z;

                camera.position.set(c4X, c4Y, c4Z)
                controls.target.set(1881, 143, 257)
                camera.updateProjectionMatrix();
                controls.update()
                //console.log(controls.target)
                updateOrbit();
            }


            //portal event listeners
            portal0.addEventListener('click', () =>{
                //portal1.value = 0; 
                toPortalZero();
            })
            portal1.addEventListener('click', () =>{
                //portal1.value = 0; 
                toPortalOne();
            })
            portal2.addEventListener('click', () =>{
                //portal1.value = 0; 
                toPortalTwo();
            })
            portal3.addEventListener('click', () =>{
                //portal1.value = 0; 
                toPortalThree();
            })
            portal4.addEventListener('click', () =>{
                //portal1.value = 0; 
                toPortalFour();
            })


            
            
            
            //console.log(portalStadium)
            controls.update(); 
            
            

            loader = new THREE.TextureLoader();
            var texture = loader.load('apple-touch-icon.png')
            
            material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
            geometry = new THREE.PlaneGeometry(100, 100*.75);
            mesh = new THREE.Mesh( geometry, material);
            //material.opacity = 1;
            mesh.position.set(219,7,-1690);
            //mesh.rotation.set(0, 0, 200)

            scene.add(mesh);

            

            //var text1 = loader.load('screens/w3artproject-001.png')
            /*var texture1 = loader.load('apple-touch-icon.png')
            var mat1 = new THREE.MeshBasicMaterial({map: texture1, transparent: true});
            var geom1 = new THREE.PlaneGeometry(10, 10*.75);
            var mesh1 = new THREE.Mesh( geom1, mat1);
            mesh1.position.set(57, 72, 57)

            scene.add(mesh1)*/
            /*/Ground test
            var ground = new THREE.PlaneGeometry(1200, 1200);
            var groundmat = new THREE.MeshBasicMaterial({wireframe: true})
            var groundPlane = new THREE.Mesh(ground, groundmat)
            groundPlane.rotation.x = 90;
            scene.add(groundPlane)
            //Sphere test
            var cloudtexture = loader.load('fair_clouds_4k.png')
            var spheregeometry = new THREE.SphereGeometry(4000, 36, 36);
            var spheremat = new THREE.MeshBasicMaterial({map: cloudtexture})
            var sphere = new THREE.Mesh(spheregeometry, spheremat);
            scene.add(sphere);*/


            
            var glbloader = new GLTFLoader();
            /*/load globe test
            
            glbloader.setCrossOrigin('anonymous').load(

                //'little_worlds.glb',
                'ground_ii.glb',
               // 'sphere.glb',
                //1 glb
                //'https://ipfs.io/ipfs/QmZSJHX97XhXujGw8CBKfTdfvZoMwSJHAn1gM3YhkSnaKi',
                //'https://ipfs.io/ipfs/QmSHjjgUdkrnHK8H85R9GAG8uH4XJxzgveSsyBqX5jrXVk',
                //'https://ipfs.io/ipfs/QmPgbhv8YbKGjSNohyoVhjPrseBU2hvtbpibHhCepnShem',
                //With Texture 'https://ipfs.io/ipfs/QmYZnEFc2FStZM5XL85igXvcVwLxKPe595gK13VAxXe2m7',
                //'https://ipfs.io/ipfs/QmSJ1rtFE2aQKraPhvnsCNrbW27M134YZ1qXUyEctyfBnj',
                ///
                //'https://ipfs.io/ipfs/Qmc6GPmfHNBJwGUfddnfVpBe1179SfCsLWqGfYZP7gF4LD',
                //'https://ipfs.io/ipfs/QmYGyF1hECgVxukYKLsdgqWbQBS7hRwpvqbceqRNrcBKd2',
                //'https://ipfs.io/ipfs/QmZFzKEEzDwWrv3rcQHDhefShnJmVCgKgSPbPCYnBLg7Az',
                //"https://ipfs.io/ipfs/QmY2Qzp5tiJMGqmpPVZGxoMnE9oVK7KgdvnuWHYuL2Pkse",
                 (gltf)=>{ 
                    gltf.scene.traverse( function( object ) {

                        if ( object.isMesh ) 
                        //object.material.map = texture;
                        object.material.wireframe = true;

                     
                     } );
                     //gltf.scene.scale.set(2, 2, 2);
                     scene.add(gltf.scene);
                },
            (xhr) => {
                const loadingPercentage = Math.ceil(xhr.loaded/xhr.total * 100);
                console.log((loadingPercentage)+ '% loaded');

                //this.props.onProgress(loadingPercentage);
            },
            (error) => {
                console.log('An error happened:' + error );

            }

            )*/
            glbloader.setCrossOrigin("anonymous").load(
                //'cape_town.glb',
                'cape.glb',
                gltf => {
                    /*gltf.scene.traverse( function (object){
                        if ( object.isMesh )
                        object.material.wireframe = true;
                        //object.receiveShadow = true;
                    });*/
                    scene.add(gltf.scene)
                }
            )
            glbloader.setCrossOrigin("anonymous").load(
                'cape_town_bld_cl.glb',
                gltf => {
                    scene.add(gltf.scene);
                }
            )
            /*glbloader.setCrossOrigin("anonymous").load(
                'sky2.glb',
                gltf => {
                    scene.add(gltf.scene)
                }
            )*/
            /*glbloader.setCrossOrigin("anonymous").load(
                'Stadium.glb',
                gltf => {
                    scene.add(gltf.scene);
                }
            )*/


            /*var light = new THREE.PointLight( 0xffffff, 1, 0 );

            // Specify the light's position
            light.position.set(1, -1200, 1 );

            // Add the light to the scene
            scene.add(light)
            var light2 = new THREE.PointLight(0xffffff, 1, 0)
            light2.position.set(1,1200,1);
            scene.add(light2);*/

            var light3 = new THREE.AmbientLight(0xffffff)
            scene.add(light3)

            // Add sunlight 
            var sun = new THREE.DirectionalLight(0xffffff, 1);
            sun.position.set(0, 1000, 0);
            sun.name='sun';
            scene.add(sun);


            window.addEventListener( 'resize', onWindowResize, false );

            

        }
        function onWindowResize(){
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
        }

        function animate(){
            //requestAnimationFrame(animate);

            renderer.setAnimationLoop(animate);

                
            //controls.update();
            //texture.needsUpdate = true;
            //mesh.rotation.y = -.1;
            renderer.render(scene, camera)
        }
        
        //await this.setPortals();
        init();
        animate();
        
        

    }
    
    
    render(){
        return(
        <>
        <Navbar/>
            <div id="desc">
                {Portals.map((item, i)=>
                <span key={i}>
                    <button id={item.id} className="p1 btn-dark" value={item.id}>{item.name}</button>
                </span>
                 )}
            {/*<Link to='/globe/0'
                onClick = {
                e => {
                    e.preventDefault()
                    window.location.hash = '/globe/0'
                    window.location.reload()
                }
            }>Hilltop City View</Link>
                <Link to='/globe/1'
                onClick = {
                e => {
                    e.preventDefault()
                    window.location.hash = '/globe/1'
                    window.location.reload()
                }
            }>Skyscrapper</Link>
            <Link to='/globe/2'
                onClick = {
                e => {
                    e.preventDefault()
                    window.location.hash = '/globe/2'
                    window.location.reload()
                }
            }>Stadium</Link>
            <Link to='/globe/3'
                onClick = {
                e => {
                    e.preventDefault()
                    window.location.hash = '/globe/3'
                    window.location.reload()
                }
            }>Beach</Link>
            <Link to='/globe/4'
                onClick = {
                e => {
                    e.preventDefault()
                    window.location.hash = '/globe/4'
                    window.location.reload()
                }
            }>Hilltop Mid View</Link>*/}
            
            </div>
        <div id="globecontainer"> 
        
        </div>

        <nav id="stats" className="navbar navbar-dark fixed-bottom navbar-expand-lg  bg-dark flex-md-nowrap p-0 shadow text-monospace">
        
        </nav>
        </>
        )
    };
}
export default Globe;