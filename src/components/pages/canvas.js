import React, {Component, Fragment} from 'react';
import {v4 } from 'uuid';
import SplitPane from 'react-split-pane';
import ThreeD from './3dcanvas';
//import Artwork from './Artwork';
//import Picker from './Picker';
//import { TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

class Canvas extends Component{
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.colorSet = this.colorSet.bind(this);
        this.brushResize = this.brushResize.bind(this);
        this.colorCanvas = this.colorCanvas.bind(this);
        this.changeOpacity = this.changeOpacity.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        //this.saveLocal = this.saveLocal.bind(this);
    }
    saving = false;
    isPainting = false;
    userStrokeStyle = '#EE92C2';
    guestStrokeStyle = '#F0c987';
    line = [];
    img = new Image();
    img2 = new Image();
    color = [];
    fill = '#ffffff';
    brush = `20`;
    alpha = `0.05`;
    

    userId = v4();
    prevPos = { offsetX: 0, offsetY: 0};

    
    saveLocal(){    
    if (localStorage.getItem("imgCanvas")!= null){
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, 0);
        }
        this.img.src = localStorage.getItem("imgCanvas");
    }
    if (localStorage.getItem("imgBack") != null){
        this.img2.onload = () => {
            this.ctx2.drawImage(this.img2, 0, 0);
        }
        this.img2.src = localStorage.getItem("imgBack");
    }
}
    save(){
        //this.saving = true;
        const dataBack = this.canvas2.toDataURL("image/png");
        const dataURL = this.canvas.toDataURL("image/png");
    if((localStorage)!= null)
    {//check if the browser supports localStorage
        //store data
        localStorage.setItem("imgBack", dataBack); 
        localStorage.setItem("imgCanvas", dataURL);
        console.log("Saving...");
        this.saving = true;
    }
    else{
        window.alert("Your browser does not support local storage");
    }
    //this.saving = false;
}
    reset(){
        //clear rect
        //ADD MODAL TO CHOOSE CONFIRM
        window.confirm("Do you want to delete this?");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }
    colorSet(){
        this.color = this.colorInput.value; 
    }
    colorCanvas(){
        

        this.fill = this.fillCanvas.value;
        //this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx2.fillStyle = this.fill;
       
        this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);
        
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    brushResize(){
        this.brush = this.brushSize.value;
        this.ctx.lineWidth = this.brush;
    }
    changeOpacity(){

        this.alpha = this.opacity.value/100;
        //console.log(this.alpha);
    }
    onMouseDown({nativeEvent}){
        const {offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY}
    }
    onMouseMove ({nativeEvent}){
       if(this.isPainting){
            const {offsetX, offsetY} = nativeEvent;
            const offSetData = {offsetX, offsetY};

            const positionData = {
                start: { ...this.prevPos},
                stop: { ...offSetData },
            };
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, this.color);
        }
        
    }
    endPaintEvent() {
        if(this.isPainting) {
            this.isPainting = false;
            //this.saveLocal();
         }
    }    
    paint(prevPos, currPos, color) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y} = prevPos;
        this.ctx.globalAlpha = this.alpha;
        //this.ctx.globalCompositeOperation = 'destination-atop';
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;

        this.ctx.moveTo(x, y);
        this.ctx.lineTo(offsetX, offsetY);
        this.ctx.stroke();
        //this.ctx.globalCompositeOperation = 'destination-in';
        this.prevPos = { offsetX, offsetY};

    }

    //TEST
    
    distanceBetween(point1, point2){
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    angleBetween(point1, point2){
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    
    /*async sendPaintData(){
        const body = {
            line: this.line,
            userId: this.userId,
        };
        const req = await fetch('http://localhost:4000/paint', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
        });
        const res = await req.json();
        this.line = [];
    }*/
    componentDidMount(){
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.canvas2.width = 960;
        this.canvas2.height = 540;
        this.ctx2 = this.canvas2.getContext('2d');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = this.brush;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        //this.fill = this.fillCanvas.value;
        //this.ctx.fillStyle = this.fill;
        //this.ctx.fillRect (0, 0, this.canvas.width, this.canvas.height)
        this.saveLocal();
        
    }
    render(){
        return(
            
            <SplitPane split="vertical" minSize="50%" style={{overflow: 'auto', position: 'relative'}}>
                
            <Fragment>
                <h3 style={{textAlign: 'center', color: 'black'}}>2D</h3>
                
                    <div id="main">
                     {/*<button onClick={this.saveLocal}>View Saved</button>*/}
                    <button onClick={this.save}>{this.saving ? "Saving..." : "Save"}</button> 
                     <label htmlFor="color"><small style={{color: 'black'}}>Pallete</small></label>
                     <input type="color" id="color" ref={(ref) => (this.colorInput = ref)} onChange={this.colorSet}/>
                     <label htmlFor="background"><small style={{color: 'black'}}>Background</small></label>
                     <input type="color" id="background" ref={(ref) => (this.fillCanvas = ref)} onChange={this.colorCanvas}/>
                     {/*<Picker/>*/}
                     <label htmlFor="size"><small style={{color: 'black'}}>Brush Size</small></label>
                     <input type="range" id="size" min="1" max="100" ref={(ref) => (this.brushSize = ref)} onChange={this.brushResize}/>
                     <label htmlFor="opacity"><small style={{color: 'black'}}>Opacity</small></label>
                     <input type="range" min="0" max="100" ref={(ref) => (this.opacity = ref)} onChange={this.changeOpacity}/>
                     {/*<button onClick={this.reset}>Reset</button>*/}
                    
                    <div style={{position: 'relative'}}>
                        <canvas
                        ref={(ref) => (this.canvas2 = ref)}
                        style={{position: 'absolute', top: '0px',}}
                        />
                        <canvas
                        ref={(ref) => (this.canvas = ref)}
                        id="canvas2d"
                        style={{position: 'absolute', top: '0px',}}
                        onMouseDown={this.onMouseDown}
                        onMouseLeave={this.endPaintEvent}
                        onMouseUp={this.endPaintEvent}
                        onMouseMove={this.onMouseMove}
                        />
                        
                    </div>
                        </div>
                
            </Fragment>
           
            <Fragment>
                <h3 style={{textAlign: 'center', color: 'black'}}>3D</h3>
                <div id="main">
                    <ThreeD/>
                </div>
            </Fragment>
            </SplitPane>
            
        );
    }
    
}
export default Canvas;