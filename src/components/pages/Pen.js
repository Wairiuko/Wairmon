import React, {  useState, useEffect } from 'react';
import useLocalStorage from './localstorage';
import { CssEditor, HtmlEditor, JavascriptEditor} from "./Editors";
import { useDebounce } from "./useDebounce";
import SplitPane from 'react-split-pane';

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
                        <script type="module">
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
        <SplitPane split="horizontal" minSize="50%"style={{overflow: 'auto'}}>
        
          <SplitPane split="vertical" minSize="50%" style={{overflow: 'auto'}}> 
        <HtmlEditor  value={htmlValue} onChange={setHtmlValue}/>
            
        <JavascriptEditor  value={jsValue} onChange={setJsValue}/>
            </SplitPane>
            
        
        
        <div id="code-003" height={heightValue} style={{overflow: 'auto'}}>
        <CssEditor  value={cssValue} onChange={setCssValue}/>
        </div>
        </SplitPane>
        <div id="code-004" style={{width: '960px', height: '540px'}}>
        <iframe srcDoc={outputValue} title="Preview" style={{width: '960px', height: '540px'}}/>
          
        
        </div>
        
        </>
        
         );
    }
  

