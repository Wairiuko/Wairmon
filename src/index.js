import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter } from 'react-router-dom';
import App from './components/Application';
//import ThreeD from './components/3D';
//import Static from './components/pages/static';
//import VRScene from './components/aframe';
import * as serviceWorker from './serviceWorker';


ReactDOM.render((
    <HashRouter>
<App/> {/*Pages*/} 
    </HashRouter>),
 document.getElementById('root'));
//ReactDOM.render(<Container />, document.getElementById("container"));
//ReactDOM.render(<ThreeD />,document.getElementById("root"));
//ReactDOM.render(<ThreeD />, document.getElementById('container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

