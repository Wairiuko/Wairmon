import React, {useState, useRef, useEffect} from "react";
import Modal from './Modal';
import Hue from './Hue';
import config from './config';
import styled from 'styled-components';

const { squareSize, barSize } = config;

export const PickerWrapper = styled.div`
user-select: none;
.swatch{
    width: 100px;
    height: 50px;
    background: ${(p) => p.color};
}
`
export const PickerOuter = styled.div`
width: ${squareSize + 20}px;
display: grid;
border-radius: 2px;
background: #ffffff;
box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
`
export const PickerInner = styled.div`
display: grid;
grid-template-rows: ${squareSize + 20}px 20px 1fr;
align-items: center;
justify-items: center; 
`

const Picker = () => {
    const [show, setShow] = useState(true)
    const [hue, setHue] = useState(180)
    const [hueX, setHueX] = useState(() => squareSize / 2 - barSize / 2)
    const [offsetTop, setoffsetTop] = useState(0)
    const [offsetLeft, setoffsetLeft] = useState(0)
    const [color, setColor] = useState(`hsla(180, 100%, 50%, 1)`)
    
    const modal = useRef(null)

    useEffect(() => {
        function setOffsets() {
            setoffsetTop(modal.current.offsetTop)
            setoffsetLeft(modal.current.offsetLeft)
        }
        if(show) {
            setOffsets()
            window.addEventListener('resize', setOffsets)
        } else{
            window.removeEventListener('resize', setOffsets)
        }
        return () => {
            window.removeEventListener('resize', setOffsets)
        }
    }, [show])
    useEffect(() => {
        setColor(`hsla(${hue}, 100%, 50%, 1)`)
    }, [hue])

    return(
        <>
        <PickerWrapper color={color}>
            <div className="swatch" onClick={() => setShow(true)}/>
                <Modal modal={modal} show={show} onClose={() => setShow(false)}>
                    <PickerOuter>
                        <PickerInner>
                            <div>square</div>
                            <Hue 
                            hueX={hueX}
                            offsetLeft={offsetLeft}
                            setHueX={setHueX}
                            setHue={setHue}
                            />
                            <div>inputs</div>
                        </PickerInner>
                    </PickerOuter>
                </Modal>
        </PickerWrapper>
        </>
    )
}
export default Picker