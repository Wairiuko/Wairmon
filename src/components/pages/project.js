import React, {Component, useRef, useState, useEffect} from 'react';
import SplitPane from 'react-split-pane';
import { CssEditor, HtmlEditor, JavascriptEditor} from "./Editors";
import styles from './Editors.module.css';
import { useDebounce } from "./useDebounce";
import Canvas from './canvas';
import useLocalStorage from './localstorage';
import Editable from './Editable';
import {Button, Navbar} from 'react-bootstrap';


export const Pen = ()=>{
    const [heightValue 
        //setHeightValue
    ] = useState("768px");
    //const [saving, setSaving] = useState(false);
    const [htmlValue, setHtmlValue] = useLocalStorage('html', `<!--This is just a template for html elements -->
    <div id="container">
    <canvas id="background"></canvas>
    <canvas id="myCanvas"></canvas>
    </div>
     `);
    const [cssValue, setCssValue] = useLocalStorage('css', `/***** Custom CSS template */
    body{
        background: rgba(0, 0, 0, 0.4);
        justify-content: center;
        text-align: center;
    }
    #container{
        position: relative;
    }
    canvas{
        cursor: crosshair;
        position: absolute;
        top: 0px;
        left: 0px;
    }`);
    const [jsValue, setJsValue] = useLocalStorage('js',`//Javascript code goes here
    var canvas, ctx, canvasBack, ctx2;
    var img = new Image();
    var img2 = new Image();
    window.onload = getItem;
    function getItem(){ 
        canvas = document.getElementById("myCanvas");
        canvas.width= 960;
        canvas.height= 540;
        ctx = canvas.getContext('2d');
        canvasBack = document.getElementById("background");
        canvasBack.width = 960;
        canvasBack.height = 540;
        ctx2 = canvasBack.getContext("2d");

        if (localStorage.getItem("imgCanvas")!= null){
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            }
            img.src = localStorage.getItem("imgCanvas");
        } 
        if (localStorage.getItem("imgBack")!= null){
            img2.onload = function(){
                ctx2.drawImage(img2, 0, 0);
            }
            img2.src = localStorage.getItem("imgBack");
        }
    }
        `);
    const[outputValue, setOutputValue] = useState("");

    const debouncedHtml = useDebounce(htmlValue, 1000);
    const debouncedJs = useDebounce(jsValue, 1000);
    const debouncedCss = useDebounce(cssValue, 1000);

    useEffect(() => {
        const output = `<html>
                        <head>
                        <style>
                        ${debouncedCss}
                        </style>
                        <script type="text/javascript">
                        ${debouncedJs}
                        </script>
                        </head>
                        <body>
                        
                        ${debouncedHtml}
                        
                        </body>
                        </html>`;
        setOutputValue(output);
    }, [debouncedHtml, debouncedCss, debouncedJs]);
   
        return( 
            <>
            <div className={styles.header}>
                {/*<button className={styles.button} /*onClick={() => (location.href='/')}>
                    New
                </button>
                <button className={styles.button} //onClick ={save}
                >
                    {//saving ? "Saving..." : "Save"}
                    }Save
                </button>*/}
            </div>
            
            
            <SplitPane 
            style={{marginTop: "0px", overflow: "auto"}}
            split="horizontal" 
            minSize='50%'
            >
                
                
                <SplitPane split="vertical" minSize={"50%"} style={{overflow: "auto"}}>
                <HtmlEditor height={heightValue} value={htmlValue} onChange={setHtmlValue}/>
                <JavascriptEditor height={heightValue} value={jsValue} onChange={setJsValue}/>
                </SplitPane>
                <SplitPane split="vertical" minSize={"80%"} style={{overflow: "auto"}}>
                <iframe srcDoc={outputValue} className={styles.previewIframe} title="Preview"/>
                <CssEditor height={heightValue} value={cssValue} onChange={setCssValue}/>
                
                </SplitPane>
                   
            </SplitPane>
            
            </>
         );
    }
export const InlineInfo = () => {
    const inputRef = useRef();
    const [title, setTitle] = useLocalStorage("title", ""); 
    return(
        <div id="info">
            <Editable
            text={title}
            placeholder="Write a project title"
            childRef={inputRef}
            type="input"
            >
            <input
              ref={inputRef}
              type="text"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Write a project title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            </Editable>
            </div>
    )
}
export const InlineStats = () => {
    const textareaRef = useRef();
    const [description, setDescription] = useLocalStorage("description", "");
    return(
            <div id="stats">
                <Editable
                text={description}
                placeholder="Description"
                childRef={textareaRef}
                type="textarea">
                    <textarea
              ref={textareaRef}
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Description for the project"
              rows="5"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
                </Editable>
            </div>
    )
}
class Project extends Component{
constructor(props){
    super(props)
    this.state = {
        projects: []
    }
}
  async componentDidMount(){
      //await 
  } 
  async loadProject(){

  }
  saveAndContinue = (e) =>{
    e.preventDefault()
    this.props.nextStep()
}
back = (e) => {
    e.preventDefault();
    this.props.prevStep();
}


    render(){
        //const inputRef = useRef();
        //const [title, setTitle] = useLocalStorage("projectName", ""); 
        //const textareaRef = useRef();
        //const [description, setDescription] = useLocalStorage("description", "");
        //const{values:{projectName, projectDescription}} = this.props;
        return(
            <>
            <Navbar sticky="top">
            <Button onClick={this.saveAndContinue}>Submit</Button>
            </Navbar>
            &nbsp;
            
            <InlineInfo/>
    
            
            
            
                <SplitPane 
            style={{marginTop: "60px", overflow: "auto"}}
            split="horizontal" 
            minSize='50%'
           >
                    <Canvas/>
                    <Pen/>
                    
            </SplitPane>
            
            <InlineStats/>
    
           </>
        );
    }
}

export default Project;