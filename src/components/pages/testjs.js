/****LOADING PANORAMA **********************************************************************************/
componentDidMount(){
    var camera, scene, renderer;
    var isUserInteracting = false,
        onMouseDownMouseX = 0, onMouseDownMouseY = 0,
        lon = 0, onMouseDownLon = 0,
        lat = 0, onMouseDownLat = 0,
        phi = 0, theta = 0;
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
    init();
    //this.loadModel();
    animate();
    function init() {
        var container, mesh;
        
        container = document.getElementById( 'container' );
        camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1100 );
        camera.target = new THREE.Vector3( 0, 0, 0 );
        scene = new THREE.Scene();
        var geometry = new THREE.SphereBufferGeometry( 1000, 120, 80 );
        // invert the geometry on the x-axis so that all of the faces point inward
        geometry.scale( - 1, 1, 1 );
        
        var texture = new THREE.TextureLoader().load( '/kloppenheim_02_4k.jpg');
        
        //scene.background = texture;
        var material = new THREE.MeshBasicMaterial( { map: texture } );
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        
        //load model
        /*var lod = new GLTFLoader();
        lod.load('dome.gltf', (gltf) => {
            scene.add(gltf.scene);
        }, (error) => {
            console.log("An error happened "+ error);
        });*/
        //ADD LIGHTS
       var lights = [];
       lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
       lights[1] = new THREE.PointLight(0xffffff, 1, 0);
       lights[2] = new THREE.PointLight(0xffffff, 1, 0);
       lights[0].position.set(0, 200, 0);
       lights[1].position.set(100, 200, 100);
       lights[2].position.set(-100, -200, -100);
       scene.add(lights[0]);
       scene.add(lights[1]);
       scene.add(lights[2]);

       /*//  render Skybox - THREEJS Example
				var sky = new Sky();
				var uniforms = sky.material.uniforms;
				uniforms[ 'turbidity' ].value = 10;
				uniforms[ 'rayleigh' ].value = 2;
				uniforms[ 'luminance' ].value = 1;
				uniforms[ 'mieCoefficient' ].value = 0.005;
				uniforms[ 'mieDirectionalG' ].value = 0.8;*/
   
        renderer = new THREE.WebGLRenderer();
        renderer.background = new THREE.TextureLoader().load('kloppenheim_02_4k.jpg');
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height );
        container.appendChild( renderer.domElement );
        container.addEventListener( 'mousedown', onPointerStart, false );
        container.addEventListener( 'mousemove', onPointerMove, false );
        container.addEventListener( 'mouseup', onPointerUp, false );
        container.addEventListener( 'wheel', onDocumentMouseWheel, false );
        container.addEventListener( 'touchstart', onPointerStart, false );
        container.addEventListener( 'touchmove', onPointerMove, false );
        container.addEventListener( 'touchend', onPointerUp, false );
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
                material.map.image.src = event.target.result;
                material.map.needsUpdate = true;
            }, false );
            reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
            container.style.opacity = 1;
        }, false );
        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }
    function onPointerStart( event ) {
        isUserInteracting = true;
        var clientX = event.clientX || event.touches[ 0 ].clientX;
        var clientY = event.clientY || event.touches[ 0 ].clientY;
        onMouseDownMouseX = clientX;
        onMouseDownMouseY = clientY;
        onMouseDownLon = lon;
        onMouseDownLat = lat;
    }
    function onPointerMove( event ) {
        if ( isUserInteracting === true ) {
            var clientX = event.clientX || event.touches[ 0 ].clientX;
            var clientY = event.clientY || event.touches[ 0 ].clientY;
            lon = ( onMouseDownMouseX - clientX ) * 0.1 + onMouseDownLon;
            lat = ( clientY - onMouseDownMouseY ) * 0.1 + onMouseDownLat;
        }
    }
    function onPointerUp() {
        isUserInteracting = false;
    }
    function onDocumentMouseWheel( event ) {
        var fov = camera.fov + event.deltaY * 0.05;
        camera.fov = THREE.Math.clamp( fov, 10, 75 );
        camera.updateProjectionMatrix();
    }
    function animate() {
        requestAnimationFrame( animate );
        update();
    }
    function update() {
        if ( isUserInteracting === false ) {
            lon += 0.1;
        }
        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.Math.degToRad( 90 - lat );
        theta = THREE.Math.degToRad( lon );
        camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
        camera.target.y = 500 * Math.cos( phi );
        camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
        camera.lookAt( camera.target );
        /*
        // distortion
        camera.position.copy( camera.target ).negate();
        */
        renderer.render( scene, camera );
    }
   }

   /************************************************************************************************ 2 */
     componentDidMount(){
       const width = this.mount.clientWidth;
       const height = this.mount.clientHeight;
       //ADD SCENE
       this.scene = new THREE.Scene();
       //ADD CAMERA
       this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
       this.camera.position.z = 8;
       //ADD RENDERER
       this.renderer = new THREE.WebGLRenderer({ antialias: true});
       this.renderer.setClearColor("#2632238");
       this.renderer.setSize(width, height);
       this.mount.appendChild(this.renderer.domElement);
       //ADD CUBE
       const geometry = new THREE.BoxGeometry(5, 5, 5);
       const material = new THREE.MeshBasicMaterial({
           color: "#0F0",
           wireframe: true
       });
       this.cube = new THREE.Mesh(geometry, material);
       this.scene.add( this.cube );
       
       //ADD SPHERE
       //LOAD TEXTURE
       var loader = new THREE.TextureLoader();
       loader.load(
           "/kloppenheim_02_4k.jpg",
           this.onLoad,
           this.onProgress,
           this.onError
       );
       //ADD LIGHTS
       var lights = [];
       lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
       lights[1] = new THREE.PointLight(0xffffff, 1, 0);
       lights[2] = new THREE.PointLight(0xffffff, 1, 0);
       lights[0].position.set(0, 200, 0);
       lights[1].position.set(100, 200, 100);
       lights[2].position.set(-100, -200, -100);
       this.scene.add(lights[0]);
       this.scene.add(lights[1]);
       this.scene.add(lights[2]);
   }
   componentWillUnmount() {
       this.stop();
       this.mount.removeChild(this.renderer.domElement);
   }
   start = () => {
       if (!this.frameId){
           this.frameId = requestAnimationFrame(this.animate);
       }
   };
   stop = () => {
       cancelAnimationFrame(this.frameId);
   };
   animate = () => {
       this.earthMesh.rotation.x += 0.01;
       this.cube.rotation.y += 0.01;
       this.renderScene();
       this.frameId = window.requestAnimationFrame(this.animate);

   };
   renderScene = () => {
       this.renderer.render(this.scene, this.camera);
   };
   onLoad = texture => {
       var objGeometry = new THREE.SphereBufferGeometry(3, 35, 35);
       var objMaterial = new THREE.MeshPhongMaterial({
           map: texture,
           shading: THREE.FlatShading
       });
       this.earthMesh = new THREE.Mesh( objGeometry, objMaterial);
       this.scene.add(this.earthMesh);
       this.renderScene();
       //start animation
       this.start();
   };
   onProgress = xhr => {
       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
   };
   onError = error => {
       console.log("An error happened" + error);
   };
   /**************************************************************** */
   /****************************3 */
     
   componentDidMount(){
    // global variables
    var renderer;
    var scene;
    var camera;
    var control;
    var stats;
    var width = this.mount.clientWidth;
    var height = this.mount.clientHeight;

    /**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
    function init() {
        var container = document.getElementById('container');
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

        // create a render, sets the background color and the size
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(width, height);
        renderer.shadowMapEnabled = true;

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(20, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -2;
        plane.position.z = 0;

         // add the plane to the scene
        scene.add(plane);

        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.name = 'cube';

        cube.castShadow = true;

        // add the cube to the scene
        scene.add(cube);

         // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(10, 20, 20);
        spotLight.shadow.camera.near = 20;
        spotLight.shadow.camera.far = 50;
        spotLight.castShadow = true;

        scene.add(spotLight);

        // position and point the camera to the center of the scene
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 13;
        camera.lookAt(scene.position);


        // setup the control object for the control gui
        control = new function() {
            this.rotationSpeed = 0.005;
            this.opacity = 0.6;
            this.color = cubeMaterial.color.getHex();
        };
        addControlGui(control);
        addStatsObject();

        // add the output of the renderer to the html element
        container.appendChild(renderer.domElement);

        // call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        render();
    }
    function addControlGui(controlObject) {
        var gui = new dat.GUI();
        gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
        gui.add(controlObject, 'opacity', 0.1, 1);
        gui.addColor(controlObject, 'color');
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild( stats.domElement );
    }
    /**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
    function render() {
        // update the camera
        var rotSpeed = control.rotationSpeed;
        camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
        camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
        camera.lookAt(scene.position);

        // change opacity
        scene.getObjectByName('cube').material.opacity = control.opacity;

        stats.update();

        // change color
        scene.getObjectByName('cube').material.color = new THREE.Color(control.color);
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }


    /**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
    function handleResize() {
        camera.aspect = width/ height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    // calls the init function when the window is done loading.
    init();
    // calls the handleResize function when the window is resized
    this.mount.addEventListener('resize', handleResize, false);
}

/**************************************************************************************** */
/***************CRAP 3 */
constructor(props){
    super(props);
//this.scaleIt = this.scaleIt.bind(this);
}
url = '/kloppenhein_02_4k.jpg';

img360 = new Image();
save3D(){
    const canvas360 = document.getElementById('canvas3d');
    canvas360.style.width = '1024px';
    canvas360.style.height = '512px';
    canvas360.style.display = 'none';
    //canvas360.style.position = "absolute";
    //document.body.appendChild(canvas360);

    //udocument.body.appendChild( canvas360 );
    //canvas360.style.visibility = hidden;
    const ctx360 = canvas360.getContext('2d');
    const cw = canvas360.width;
    const ch = canvas360.height;
    var img = new Image();
    img.onload = function(){
    var canvas1 = scaleIt(img, 0.50);
    canvas360.width = canvas1.width/2;
    canvas360.height = canvas1.height/2;
    ctx360.drawImage(img, 0, 0, cw, ch);
    //this.img360.src = './kloppenhein_02_4k.jpg';
    };
    img.src = './kloppenheim_02_4k.jpg';
    function scaleIt(source, scaleFactor){
        var c=document.createElement('canvas');
        var ctx = c.getContext('2d');
        var w = source.width*scaleFactor;
        var h = source.height*scaleFactor;
        c.width=w;
        c.height = h;
        ctx.drawImage(source,0,0,w,h);
        return(c);
 
    }
    ctx360.fillStyle = "#000000";
    //ctx360.fillRect(0, 0, cw, ch);
    const data360 = canvas360.toDataURL("image/jpeg");
    if((localStorage) != null){
        localStorage.setItem("img360", data360);
    }else{
        window.alert("Your browser does not support local storage");
    };
    //const image = document.createElement ('img');
    //document.appendChild( image );
    //image.src = localStorage.getItem('img360');
    
    

}

componentDidMount(){
var camera, scene, renderer;
var isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;




//this.save3D();

init();
//this.loadModel();
animate();
//I need a 2:1 canvas which serves as a preset for the 360 background texture
//Whenever the 2D canvas is updated, it is consequently drawn on this 360 background
//All this will happen in local storage
//url will be a const that returns the initial 360 background texture
//everytime the save function in 2D canvas is called, the url will be updated
function init() {
    var container, mesh;
    var canvas = document.getElementById('canvas3d')
    var ctx = canvas.getContext('2d');
    ctx.fillStyle ="#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(3, 3, 512, 256);
    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1100 );
    camera.target = new THREE.Vector3( 0, 0, 0 );
    scene = new THREE.Scene();

    
    var geometry = new THREE.SphereBufferGeometry( 1000, 120, 80 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );
    const url1 = '/kloppenheim_02_4k.jpg'
    const url = (localStorage.getItem('img360'));
    
    
    var textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('');
    var text = textureLoader.load(url1);
    var texture = new THREE.Texture(canvas);
    var geom = new THREE.BoxGeometry(200, 200, 200);
    
    //scene.background = texture;
    var material = new THREE.MeshBasicMaterial( { map: text } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    
    //ADD LIGHTS
   var lights = [];
   lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
   lights[1] = new THREE.PointLight(0xffffff, 1, 0);
   lights[2] = new THREE.PointLight(0xffffff, 1, 0);
   lights[0].position.set(0, 200, 0);
   lights[1].position.set(100, 200, 100);
   lights[2].position.set(-100, -200, -100);
   scene.add(lights[0]);
   scene.add(lights[1]);
   scene.add(lights[2]);

   

    renderer = new THREE.WebGLRenderer();
    //renderer.background = new THREE.TextureLoader().load('/360_world.jpg');
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height );
    container.appendChild( renderer.domElement );
    container.addEventListener( 'mousedown', onPointerStart, false );
    container.addEventListener( 'mousemove', onPointerMove, false );
    container.addEventListener( 'mouseup', onPointerUp, false );
    container.addEventListener( 'wheel', onDocumentMouseWheel, false );
    container.addEventListener( 'touchstart', onPointerStart, false );
    container.addEventListener( 'touchmove', onPointerMove, false );
    container.addEventListener( 'touchend', onPointerUp, false );
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
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
        }, false );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
        container.style.opacity = 1;
    }, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
}
function onPointerStart( event ) {
    isUserInteracting = true;
    var clientX = event.clientX || event.touches[ 0 ].clientX;
    var clientY = event.clientY || event.touches[ 0 ].clientY;
    onMouseDownMouseX = clientX;
    onMouseDownMouseY = clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}
function onPointerMove( event ) {
    if ( isUserInteracting === true ) {
        var clientX = event.clientX || event.touches[ 0 ].clientX;
        var clientY = event.clientY || event.touches[ 0 ].clientY;
        lon = ( onMouseDownMouseX - clientX ) * 0.1 + onMouseDownLon;
        lat = ( clientY - onMouseDownMouseY ) * 0.1 + onMouseDownLat;
    }
}
function onPointerUp() {
    isUserInteracting = false;
}
function onDocumentMouseWheel( event ) {
    var fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.Math.clamp( fov, 10, 75 );
    camera.updateProjectionMatrix();
}
function animate() {
    requestAnimationFrame( animate );
    update();
}
function update() {
    if ( isUserInteracting === false ) {
        lon += 0;
    }
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );
    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    camera.lookAt( camera.target );
    /*
    // distortion
    camera.position.copy( camera.target ).negate();
    */
    renderer.render( scene, camera );
}
}