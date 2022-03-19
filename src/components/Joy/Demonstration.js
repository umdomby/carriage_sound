import React, {useEffect, useState} from 'react'
//import UnderlinedTitle from './UnderlinedTitle'
import Canvas from './Canvas'
import './Styles/Demonstration.css'
import {Control} from "../../Control/controlVoceButton";
import store from "../../store/DeviceStore";

const Demonstration = () => {

    const [position, setPosition] = useState({x: 0, y: 0})
    const [angle, setAngle] = useState(0)

    const handleChange = (data) => {
        setPosition(data.movement)
        setAngle(data.angle)
    }

    return(
        <div>
            {/*<UnderlinedTitle text="Showing data" />*/}
            {/*<div className="canvas-and-data clearfix">*/}
            {/*    <div className="demonstration-joystick-info">*/}
            {/*        /!*<p className="documentation-paragraph"><span className="getPos-span">getPosition()</span> - Assuming it's applied on a video game where Y axis is inverted (general rule),*!/*/}
            {/*        /!*returns how much has to be added on X and Y in a scale -1 to 1, in order to move the character. Also returns the angle of the inner circle in degrees</p>*!/*/}
            {/*        <div className="demonstration-data">*/}
            {/*            <p><span>X: </span>{position.x}</p>*/}
            {/*            <p><span>Y: </span>{position.y}</p>*/}
            {/*            <p><span>Angle: </span>{angle}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="demosntration-canvas-div">*/}
            {/*        <Canvas name="demonstration" onChange={handleChange} />*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div >
                <Canvas name="demonstration" onChange={handleChange} />
            </div>

            <div>
                {/*<p><span>X: </span>{position.x}</p>*/}
                {/*<p><span>Y: </span>{position.y}</p>*/}
                {/*<p><span>Angle: </span>{angle}</p>*/}
            </div>
        </div>
    )
}

export default Demonstration
