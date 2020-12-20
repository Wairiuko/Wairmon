import React, {useRef} from "react";
import {Canvas, extend, useThree, useFrame} from "react-three-fiber";
import { CubeTextureLoader,
         CubeCamera,
         WebGLCubeRenderTarget,
         RGBFormat,
         LinearMipmapLinearFilter,
 } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

//extend({ OrbitControls});

const CameraControls = () => {

    const{
        camera,
        gl: {domElement},
    } = useThree();

    const controls = useRef();
    useFrame(() => controls.current.update());
    return(
        <OrbitControls
        ref={controls}
        args={[camera, domElement]}
        autoRotate={true}
        enableZoom={false}
        />
    );
};
//Loads the skybox texture and applies it to the scene
function SkyBox(){
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    const texture = loader.load([
        './textures/posx.jpg', './textures/negx.jpg', './textures/posy.jpg', './textures/negy.jpg', './textures/posz.jpg', './textures/negz.jpg'

    ]);
    scene.background = texture;
    return null;
}
function Sphere(){
    const { scene, gl } = useThree();

    const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
        format: RGBFormat,
        generateMipmaps: true,
        minFilter: LinearMipmapLinearFilter,
    });
    const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
    cubeCamera.position.set(0, 100, 0);
    scene.add(cubeCamera);

    useFrame(() => cubeCamera.update(gl, scene));
    return(
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
            <sphereGeometry attach="geometry" args={[2, 32, 32]} />
            <meshBasicMaterial 
                attach="material"
                envMap={cubeCamera.renderTarget.texture}
                color="white"
                roughness={0.1}
                metalness={1}
            />
        </mesh>
    );
}

//Lights
function App(){
    return(
        <Canvas className="canvas">
            <CameraControls/>
            <Sphere/>
            <SkyBox/>
        </Canvas>
    );
}

export default App;