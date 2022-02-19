import React, {useContext, useEffect, useRef, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Context} from "../index";
import {
    UpDown,
    Stop,
    LeftRight,
    DegreeGoBack,
    DegreeLeftRight,
    daleyCommand,
    accelF, langF
} from '../Control/controlVoceButton'
import {Button} from "react-bootstrap";
import {russian} from "../command/russian";
import WebSocketProject from "./WebSocketProject";


import store from "../store/DeviceStore"

const Dictaphone33 = () => {

    //const {device} = useContext(Context)
    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const [voice, setVoice] = useState(true)
    // const [face, setFace] = useState(false)
    const [accelState, setAccelState] = useState(store.accel)
    const [speedStateUD, setSpeedStateUD] = useState(store.degreegoback)
    const [speedStateLR, setSpeedStateLR] = useState(store.degreeleftright)
    const [delayCommand, setDelayCommand] = useState(store.delaycommand)
    const [languages, setLanguages] = useState(store.lang)
    const [ipaddressState, setIpaddressState] = useState(store.ipaddress)
    const [idSocket, setIdSocket] = useState(5)

    const timerControlUp = useRef(null)
    const timerControlDown = useRef(null);
    const timerControlLeft = useRef(null);
    const timerControlRight = useRef(null);

    useEffect(()=>{
        const timer = setTimeout(() => {
            setSpeedStateUD(store.degreegoback)
            setSpeedStateLR(store.degreeleftright)
            setAccelState(store.accel)
            setDelayCommand(store.delaycommand)
            setLanguages(store.lang)
            setIpaddressState(store.ipaddress)
        }, 1000);
        return () => clearTimeout(timer);
    },[])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    useEffect(() => {
         loadSpeechRecognition();
    }, []);

    const loadSpeechRecognition = () => {
        setLoadingSpeechRecognition(false);
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }

    useEffect(() => {
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }, [languages]);


    useEffect(() => {
        speech(transcript.toString().toLowerCase())
        if (transcript.toString().length > 100) {
            resetTranscript()
        }
    }, [transcript]);

    const speech = (text) => {
        let action = russian(text, voice, languages)
        if(action != '') {
            if(action === 'голос включен'){setVoice(true)}
            if(action === 'голос выключен'){setVoice(false)}
            // if(action === 'мимика включена'){setFace(true)}
            // if(action === 'мимика выключена'){setFace(false)}
            if(action === 'вперёд' || action === 'go'){controlUp()}
            if(action === 'назад' || action === 'back'){controlDown()}
            if(action === 'влево' || action === 'left'){controlLeft()}
            if(action === 'вправа' || action === 'right'){controlRight()}
            if(action === 'стоп' || action === 'stop'){controlStop()}
            // if(action === 'мимика и голос включены'){
            //     setVoice(true)
            //     setFace(true)
            //     store.setFaceControl(true)}
            // if(action === 'мимика и голос выключены'){
            //     setVoice(false)
            //     setFace(false)
            //     store.setFaceControl(false)}
            resetTranscript()
        }
    }

    if (loadingSpeechRecognition || !browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const voiceButton = () => {
        setVoice(!voice)
    }
    // const faceButton = () => {
    //     store.setFaceControl(!store.faceControl)
    //     setFace(!face)
    // }
    const controlUp = () => {
        timerControlUp.current = setTimeout(() => {
            UpDown(store.webSocket, -1 + store.degreegoback/10, Number(idSocket))
        }, store.delaycommand * 1000);
    }
    const controlDown = () => {
        timerControlDown.current = setTimeout(() => {
            UpDown(store.webSocket, 1 - store.degreegoback/10, Number(idSocket))
        }, store.delaycommand * 1000);
    }
    const controlLeft = () => {
        timerControlLeft.current = setTimeout(() => {
            LeftRight(store.webSocket, -1 + store.degreeleftright/10, Number(idSocket))
        }, store.delaycommand * 1000);
    }
    const controlRight = () => {
        timerControlRight.current = setTimeout(() => {
            LeftRight(store.webSocket, 1 - store.degreeleftright/10, Number(idSocket))
        }, store.delaycommand * 1000);
    }

    const controlStop = () => {
        clearTimeout(timerControlUp.current)
        clearTimeout(timerControlDown.current)
        clearTimeout(timerControlLeft.current)
        clearTimeout(timerControlRight.current)
        Stop(store.webSocket, Number(idSocket))
    }

    const accelPlus = () => {
        if(accelState < 10){
        accelUse(accelState + 1)}
    }
    const accelMinus = () => {
        if(accelState > 1){
        accelUse(accelState - 1)}
    }
    const accelUse = (accel) => {
        setAccelState(accel)
        accelF(store.webSocket, accel)
    }
    const speedUseUD = (speedUD) => {
        setSpeedStateUD(speedUD)
        DegreeGoBack(store.webSocket, speedUD)
    }
    const speedUseLR = (speedLR) => {
        setSpeedStateLR(speedLR)
        DegreeLeftRight(store.webSocket, speedLR)
    }
    const delayCommandF = (delay) => {
        setDelayCommand(delay)
        daleyCommand(store.webSocket, delay)
    }

    const languagesF = (languages) => {
        setLanguages(languages)
        langF(store.webSocket, languages)
    }

    const ipaddressF = () => {
        store.setIpaddress(ipaddressState)
        //ipaddressFunck(ipaddressState)
    }

    const connect = () => {
        WebSocketProject(4)
    }

    return (
        <div>
            <div style={{margin: 3}}>Microphone: {listening ? 'on' : 'off'} {languages}</div>
            <div>
                {/*<button onClick={loadSpeechRecognition}>Start</button>*/}
                <button onClick={startListening}>Start</button>
                <button onClick={stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <button style={{backgroundColor: voice ? 'green' : 'red'}} onClick={voiceButton}>голос</button>
                {/*<button style={{backgroundColor: face ? 'green' : 'red'}} onClick={faceButton}>мимика</button>*/}
            </div>
            <div style={{marginTop: 4}}>
                <Button style={{marginRight : 3, width: 50}} onClick={accelPlus}> + </Button>
                <label>{accelState}</label>
                <Button style={{marginLeft : 3, width: 50, marginRight: 5}} onClick={accelMinus}> - </Button>
                замедление
            </div>
            <div>
                <input type='number' step="1" min='0' max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={speedStateUD}
                       onChange={(event) => {
                           // setSpeedState(event.target.value)
                           speedUseUD(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Degree GO, BACK
            </div>
            <div>
                <input type='number' step="1" min='0' max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={speedStateLR}
                       onChange={(event) => {
                           // setSpeedState(event.target.value)
                           speedUseLR(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Degree LEFT, RIGHT
            </div>
            <div>
                <input type='number' step="1" min='0' max='5'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={delayCommand}
                       onChange={(event) => {
                           // setSpeedState(event.target.value)
                           delayCommandF(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Delay COMMAND
            </div>
            {/*<div>*/}
            {/*    <input type='text'*/}
            {/*           style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 150, fontSize: 16, marginTop: 4, marginRight: 5}}*/}
            {/*           value={ipaddressState}*/}
            {/*           onChange={(event) => {*/}
            {/*               setIpaddressState(event.target.value)*/}
            {/*               // delayCommandF(event.target.value)*/}
            {/*           }}*/}
            {/*           onKeyPress={event => {*/}
            {/*               if (event.key === "Enter") {*/}
            {/*                   ipaddressF()*/}
            {/*                   //return sendUpDownLeftRight()*/}
            {/*               }*/}
            {/*           }}*/}
            {/*    />*/}
            {/*    IP ADDRESS*/}
            {/*</div>*/}
            <div>{transcript}</div>
            <div>
                <select value={languages} onChange={(event) => {
                    languagesF(event.target.value)
                }}>
                    <option value="ru-RU">Russian</option>
                    <option value="en-GB">English</option>
                </select>
            </div>

            <div style={{marginTop: '20px'}}>
                <button onClick={controlUp}>GO</button>
                <button onClick={controlDown}>BACK</button>
                <button onClick={controlLeft}>LEFT</button>
                <button onClick={controlRight}>RIGHT</button>
                <button onClick={controlStop}>STOP</button>
            </div>
            <div>
                <input type='number'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={idSocket}
                       onChange={(event) => {
                           setIdSocket(event.target.value)
                       }}
                />
            </div>
            <div>
                <button onClick={connect}>Connect</button>
            </div>
            {/*<WebSocketProject id={idSocket}/>*/}
        </div>
    );
};
export default Dictaphone33;
