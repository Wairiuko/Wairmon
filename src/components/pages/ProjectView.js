import React, {Component} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import SplitPane from 'react-split-pane';
import { CssEditor, HtmlEditor, JavascriptEditor} from "./Editors";
//import { useParams } from 'react-router-dom';

const img = new Image();
export function ProjectTest(props){
    const date = props.match.params.date;
    const title = props.match.params.title;

}
class ProjectView extends Component{

state={
       heightValue: '200px'
}


    componentDidMount(){
        //document.getElementById('demo').innerHTML = obj.name + ',' + obj.description //+ ',' + obj.code
        /*fetch(`https://ipfs.infura.io/ipfs/${this.props.projectHash}`)
                .then((response) => {
                    return response.json()
                })
                .then((json) =>{
                    this.setState({ data: json})
                    //console.log(this.state.data)
                });
                */
        //const jsonObject = this.props.projectImage;
        //var mainImg = document.getElementById('image')
        var camera, renderer, scene, controls;// clone;
        var container = document.getElementById('container');
        var width = window.innerWidth;
        var height = window.innerHeight;
        var codeTitle = '<h3>Code Art</h3>';
        var drawingTitle = '<h3>Drawing</h3>';
        function init(){
        renderer = new CSS3DRenderer();
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1000 );
        controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;

        renderer.setSize(width, height);
        renderer.domElement.style.backgroundImage = // eslint-disable-next-line
            "url(" + `/screens/starry_background.jpg` + ")";
        container.appendChild(renderer.domElement)
        camera.position.set(0, 200, 1000);
        camera.lookAt(scene.position);

        //clone = createCSS3DObject();
        //clone.position.set(0, 0, 0);
        //clone.rotation.set(0, -90, 0)
       // scene.add(clone)

        var codetitle = createCSS(codeTitle);
        codetitle.position.set(-1000, 300, 0)
        scene.add(codetitle)

        var drawingtitle = createCSS(drawingTitle);
        drawingtitle.position.set(0, 300, 0);
        scene.add(drawingtitle)
        
        var image = createImage();
        image.position.set(0, 0, 0);
        scene.add(image)
        /*var html = createHtml();
        html.position.set(1, 200, -500);
        html.rotation.set(45, 0, 0);
        scene.add(html)

        var js = createJs();
        js.position.set(500, 1, -500);
        js.rotation.set(0, -45, 0);
        scene.add(js)

        var css = createCss();
        css.position.set(1, -500, 1);
        scene.add(css)*/

        var iframe = createIframe();
        iframe.position.set(-1000, 0, 0);
        scene.add(iframe)
        


        animate();
        window.addEventListener('resize', onWindowResize, false);
        container.addEventListener('resize', onWindowResize, false);
        }
        function createCSS(s){
            var div = document.createElement('div');
            div.innerHTML = s;
            div.style.textAlign = 'center';
            var object = new CSS3DObject(div);
            return object;
        }
       function createImage(){
           var div = document.createElement('div');
           var imgMain = document.getElementById('image');
           div.appendChild(imgMain)
           var object = new CSS3DObject(div);
           return object;
       }
        /*function createHtml(html){
            html = document.getElementById('code-001');
            html.style.width = '480px';
            
            var object = new CSS3DObject(html);
            return object;
        }
        function createJs(js){
            js = document.getElementById('code-002');
            js.style.width = '480px';
            var object = new CSS3DObject(js);
            return object;
        }
        function createCss(css){
            css = document.getElementById('code-003');
            css.style.width = '480px';
            var object = new CSS3DObject(css);
            return object;
        }*/
        function createIframe(iframe){
            iframe = document.getElementById('code-004');
            //iframe.style.width = '480px';
            //iframe.style.height = '270px';
            var object = new CSS3DObject(iframe);
            return object;
        }

       /* function createCSS3DObject(canvas){
        var div = document.createElement('div')
        img.onload = () => {
            canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 960;
            canvas.height = 540;
            ctx.drawImage(img, 0, 0)
            div.appendChild(canvas)
        }
        img.src = jsonObject

        
         var object = new CSS3DObject(div)
         return object
        }*/
        function animate(){
            //controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        function onWindowResize(){
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
        }

    init();
    window.addEventListener('resize', onWindowResize, false);
    container.addEventListener('resize', onWindowResize, false);

    }
render()

{
    
    //console.log(this.props.match.params);
    console.log(this.props.data);
    //var title = this.props.match.params.title;
    //var project = this.props.data.find(p => p.project.title === title);
    
    return(
        <>
        <nav id="prev" className="navbar navbar-dark sticky-top navbar-expand-lg  bg-dark flex-md-nowrap p-0 shadow text-monospace"> <div style={{textAlign: 'center', width: '100%'}}>{this.props.projectTitle}</div> </nav>
        <img id="image" src={this.props.projectImage} alt="Drawing"/>
        <SplitPane split="vertical" minSize="70%">
        <div id="container" ref={ref => {this.mount = ref} }></div>
        
        <>
        <SplitPane split="horizontal" minSize="50%" style={{overflow: 'auto'}}>
        
          <SplitPane split="vertical" minSize="50%" style={{overflow: 'auto'}}> 
        <HtmlEditor  value={this.props.projectHtml} />
            
        <JavascriptEditor  value={this.props.projectJs} />
            </SplitPane>
            
        
        
        <div id="code-003" height={this.props.heightValue} style={{overflow: 'auto'}}>
        <CssEditor  value={this.props.projectCss} />
        </div>
        </SplitPane>
        <div id="code-004">
        <iframe srcDoc={`<html><head><style>${this.props.projectCss}</style><script type="module">${this.props.projectJs}</script></head><body>${this.props.projectHtml}</body></html>`} title="Preview" style={{width: '960px', height: '540px'}}/>
        
            
        
        </div>
        
        
        
        </>
        
        </SplitPane>
        <nav id="desc" className="navbar navbar-dark fixed-bottom navbar-expand-lg  bg-dark flex-md-nowrap p-0 shadow text-monospace"><div style={{textAlign: 'center', width: "100%"}}>{this.props.projectDescription}</div></nav>
        </>
    )
}

}
export default ProjectView;