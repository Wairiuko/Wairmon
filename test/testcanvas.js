import React, {Component, Fragment} from 'react';
import {v4 } from 'uuid';
import SplitPane from 'react-split-pane';
import Artwork from './Artwork';
import ColorWheel from './Picker';
import { TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

class Canvas extends Component{
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        //this.saveLocal = this.saveLocal.bind(this);
    }
    isPainting = false;
    userStrokeStyle = '#EE92C2';
    guestStrokeStyle = '#F0c987';
    line = [];
    img = new Image();

    userId = v4();
    prevPos = { offsetX: 0, offsetY: 0};
    saveLocal(){    
    if (localStorage.getItem("imgCanvas")!= null){
        const img = new Image();
        img.onload = function (){
            this.ctx.drawImage(this.img, 0, 0);
        }
        this.img.src = localStorage.getItem("imgCanvas");
    }
}
    save(){
        const dataURL = this.canvas.toDataURL();
    if(typeof(localStorage)!= null)
    {//check if the browser supports localStorage
        //store data 
        localStorage.setItem("imgCanvas", dataURL);
        console.log("Saving...");
    }
    else{
        window.alert("Your browser does not support local storage");}
}
    reset(){
        //clear rect
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        window.alert("Do you want to delete this?");
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
            this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
    }
    endPaintEvent() {
        if(this.isPainting) {
            this.isPainting = false;
            this.sendPaintData();
         }
    }    
    paint(prevPos, currPos, strokeStyle) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y} = prevPos;

        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;

        this.ctx.moveTo(x, y);
        this.ctx.lineTo(offsetX, offsetY);
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY};

    }
    async sendPaintData(){
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
    }
    componentDidMount(){
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
        this.saveLocal();
    }
    render(){
        return(
            
            <SplitPane split="vertical" minSize="50%" style={{overflow: 'auto'}}>
                {/*</SplitPane><TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}>
                {({ zoomIn, zoomOut, resetTransform, ...rest}) =>(*/}
            <Fragment>
                <h3 style={{textAlign: 'center', color: 'black'}}>2D</h3>
                {/*<div className="tools">
                    <button onClick={zoomIn}>+</button>
                    <button onClick={zoomOut}>-</button>
                    <button onClick={resetTransform}>X</button>
                </div>
                <TransformComponent>*/
                    <div id="main">
                     {/*<button onClick={this.saveLocal}>View Saved</button>*/}
                     <button onClick={this.save}>Save</button> 
                     <button onClick={this.reset}>Reset</button> 
                    {/*<div className="color-guide">
                        <h5>Color Guide</h5>
                        <div className="user user">User</div>
                        <div className = "user guest">Guest</div>
                    </div>*/}
                        <canvas
                        ref={(ref) => (this.canvas = ref)}
                        id="canvas"
                        style={{background: 'black'}}
                        onMouseDown={this.onMouseDown}
                        onMouseLeave={this.endPaintEvent}
                        onMouseUp={this.endPaintEvent}
                        onMouseMove={this.onMouseMove}
                        />
                        </div>
                /*</TransformComponent>*/}
            </Fragment>
           {/* )}
            </TransformWrapper>*/}
            <Fragment>
                <h3 style={{textAlign: 'center', color: 'black'}}>3D</h3>
                <div className="main">
                    <Artwork/>
                </div>
            </Fragment>
            </SplitPane>
            
        );
    }
    
}
export default Canvas;