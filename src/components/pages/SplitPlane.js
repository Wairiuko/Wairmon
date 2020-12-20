import React from 'react';
const splitPlaneContext = React.createContext();
export default function SplitPlane({ children, ...props}){
    const [topHeight, setTopHeight] = React.useState(null);
    const separatorYPosition = React.useRef(null);
    const splitPlaneRef = React.createRef();
    const onMouseDown = e => {
        separatorYPosition.current = e.clientY;
    };
    const onMouseMove = e => {
        if(!separatorYPosition.current){
            return;
        }
    const newTopHeight = topHeight + e.clientY - separatorYPosition.current;
    separatorYPosition.current = e.clientY;
    if(newTopHeight <= 0){
        return topHeight !== 0 && setTopHeight(0);
    }
    const splitPlaneHeight = splitPlaneRef.current.clientHeight;
    if(newTopHeight >= splitPlaneHeight){
        return topHeight !== splitPlaneHeight && setTopHeight(splitPlaneHeight);
    }
    setTopHeight(newTopHeight);
    };
    const onMouseUp = () => {
        separatorYPosition.current = null;
    };
    React.useEffect(() =>{
        document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    
    return() => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };
    });
    return(
        <div {...props} className="split-plane" ref={splitPlaneRef}>
            <splitPlaneContext.Provider value={{topHeight, setTopHeight}}>
            {children[0]}
        
        <div className="separator" onMouseDown={onMouseDown}/>
        {children[1]}
        </splitPlaneContext.Provider>
        </div>
    );
}
SplitPlane.Top = function SplitPlaneTop(props){
    const topRef = React.createRef();
    const { topHeight, setTopHeight } = React.useContext(splitPlaneContext);
    React.useEffect(()=>{
        if (!topHeight){
            setTopHeight(topRef.current.clientHeight);
            topRef.current.style.flex = "none";
            return;
        }
        topRef.current.style.height = `${topHeight}px`;
    }, [topHeight]);
    return <div {...props} className="split-plane-top" ref={topRef}/>;
};
SplitPlane.Bottom = function SplitPlaneBottom(props){
    return <div {...props} className="split-plane-bottom"/>;
}