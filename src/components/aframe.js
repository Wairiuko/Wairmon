import React, {Component} from "react";
import "aframe";
import "aframe-particle-system-component";
import {Entity, Scene} from "aframe-react";
import "./App.css";

class VRScene extends Component {
    render(){
        return(
            <Scene>
                <Entity geometry={{primitive: "box"}} material={{color: "black"}} position={{x:0, y:0, z: -5}}/>
                <Entity particle-system={{preset: "snow"}}/>
                <Entity light={{type: "point"}}/>
                <Entity gltf-model={{src: "dome.gltf"}}/>
                <Entity text={{value: "Welcome to the Pantheon"}}/>
            </Scene>
        )
    }
}
export default VRScene;