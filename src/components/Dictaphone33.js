import React, {useEffect, useRef, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
    Stop, Control
} from '../Control/controlVoceButton'
import {russian} from "../command/russian";
import WebSocketProject from "./WebSocketProject";
import store from "../store/DeviceStore"


const Dictaphone33 = () => {

    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const [voice, setVoice] = useState(true)
    const [face, setFace] = useState(false)

    const [accelState, setAccelState] = useState(localStorage.getItem('localAccelState') || 1)
    const [speedStateUD, setSpeedStateUD] = useState(localStorage.getItem('localSpeedStateUD') || 0)
    const [speedStateLR, setSpeedStateLR] = useState(localStorage.getItem('localSpeedStateLR') || 0)
    const [delayCommand, setDelayCommand] = useState(localStorage.getItem('localDelayCommand') || 0)
    const [languages, setLanguages] = useState(localStorage.getItem('localLanguages') || 'ru-RU')
    const [idSocket, setIdSocket] = useState(localStorage.getItem('localIdSocket') || '')


    const timerControlUp = useRef(null)
    const timerControlDown = useRef(null);
    const timerControlLeft = useRef(null);
    const timerControlRight = useRef(null);

    useEffect(()=>{
        if( localStorage.getItem('localIdSocket') === null || localStorage.getItem('localIdSocket') === undefined) {
            //localStorage.setItem('localIdSocket', pass_gen())
            localStorage.setItem('localIdSocket', '123')
        }
        setIdSocket(localStorage.getItem('localIdSocket') || '')
        store.setIdSocket(idSocket)
        connectID(idSocket)
    },[idSocket])

    const rekey = () => {
        localStorage.setItem('localIdSocket', pass_gen())
        store.setIdSocket(localStorage.getItem('localIdSocket') || '')
        setIdSocket(store.idSocket)
        // setIdSocket(localStorage.getItem('localIdSocket') || '')
        // store.setIdSocket(idSocket)
    }

    const connectID = () => {
        WebSocketProject(idSocket)
    }

    const pass_gen = () => {
        const chrs = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        var str = '';
        for (var i = 0; i < 7; i++) {
            var pos = Math.floor(Math.random() * chrs.length);
            str += chrs.substring(pos, pos+1);
        }
        return str;
    }

    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         setSpeedStateUD(store.degreegoback)
    //         setSpeedStateLR(store.degreeleftright)
    //         setAccelState(store.accel)
    //         setDelayCommand(store.delaycommand)
    //         setLanguages(store.lang)
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // },[])

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
            if(action === '?????????? ??????????????'){setVoice(true)}
            if(action === '?????????? ????????????????'){setVoice(false)}
            if(action === '???????????? ????????????????'){
                store.setFaceControl(true)
                setFace(true)}
            if(action === '???????????? ??????????????????'){
                store.setFaceControl(false)
                setFace(false)}
            if(action === '????????????' || action === 'go'){controlUp()}
            if(action === '??????????' || action === 'back'){controlDown()}
            if(action === '??????????' || action === 'left'){controlLeft()}
            if(action === '????????????' || action === 'right'){controlRight()}
            if(action === '????????' || action === 'stop'){controlStop()}
            if(action === '???????????? ?? ?????????? ????????????????'){
                setVoice(true)
                setFace(true)
                store.setFaceControl(true)}
            if(action === '???????????? ?? ?????????? ??????????????????'){
                setVoice(false)
                setFace(false)
                store.setFaceControl(false)}
            resetTranscript()
        }
    }

    const faceButton = () => {
        store.setFaceControl(!store.faceControl)
        setFace(!face)
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
            Control(store.webSocket, -1 + speedStateUD/10,0, idSocket, accelState)
        }, delayCommand * 1000);
    }
    const controlDown = () => {
        timerControlDown.current = setTimeout(() => {
            Control(store.webSocket, 1 - speedStateUD/10,0, idSocket, accelState)
        }, delayCommand * 1000);
    }
    const controlLeft = () => {
        timerControlLeft.current = setTimeout(() => {
            Control(store.webSocket, 0,-1 + speedStateLR/10, idSocket, accelState)
        }, delayCommand * 1000);
    }
    const controlRight = () => {
        timerControlRight.current = setTimeout(() => {
            Control(store.webSocket, 0,1 - speedStateLR/10, idSocket, accelState)
        }, delayCommand * 1000);
    }

    const controlStop = () => {
        clearTimeout(timerControlUp.current)
        clearTimeout(timerControlDown.current)
        clearTimeout(timerControlLeft.current)
        clearTimeout(timerControlRight.current)
        Stop(store.webSocket, idSocket)
    }

    return (
        <div>
            <div style={{margin: 3}}>Microphone: {listening ? 'on' : 'off'} {languages}</div>
            <div>
                {/*<button onClick={loadSpeechRecognition}>Start</button>*/}
                <button onClick={startListening}>Start</button>
                <button onClick={stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <button style={{backgroundColor: voice ? 'green' : 'red'}} onClick={voiceButton}>??????????</button>
                <button style={{backgroundColor: face ? 'green' : 'red'}} onClick={faceButton}>????????????</button>
            </div>
            {/*<div style={{marginTop: 4}}>*/}
            {/*    <Button style={{marginRight : 3, width: 50}} onClick={accelPlus}> + </Button>*/}
            {/*    <label>{accelState}</label>*/}
            {/*    <Button style={{marginLeft : 3, width: 50, marginRight: 5}} onClick={accelMinus}> - </Button>*/}
            {/*    Delay*/}
            {/*</div>*/}

            <div>
                <input type='number' step="1" min='1' max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={accelState}
                       onChange={(event) => {
                           localStorage.setItem('localAccelState', event.target.value)
                           setAccelState(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Slow
            </div>
            <div>
                <input type='number' step="1" min='0' max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={speedStateUD}
                       onChange={(event) => {
                           localStorage.setItem('localSpeedStateUD', event.target.value)
                           setSpeedStateUD(event.target.value)
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
                           localStorage.setItem('localSpeedStateLR', event.target.value)
                           setSpeedStateLR(event.target.value)
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
                           localStorage.setItem('localDelayCommand', event.target.value)
                           setDelayCommand(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Delay COMMAND
            </div>
            <div>{transcript}</div>
            <div>
                <select value={languages} onChange={(event) => {
                    localStorage.setItem('localLanguages', event.target.value)
                    setLanguages(event.target.value)
                }}>
                    <option value="ru-RU">Russian</option>
                    <option value="en-GB">English</option>
                </select>
            </div>
            <div style={{marginTop: '3px'}}>
                ??????????????????????: ??????????, ????????????, ????????????, ??????????
            </div>
            <div style={{marginTop: '3px'}}>
                <button onClick={controlUp}>GO</button>
                <button onClick={controlDown}>BACK</button>
                <button onClick={controlLeft}>LEFT</button>
                <button onClick={controlRight}>RIGHT</button>
                <button onClick={controlStop}>STOP</button>
            </div>
            <div>
                <input type='text'
                       disabled={false}
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 120, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={idSocket}
                       onChange={(event) => {
                           localStorage.setItem('localIdSocket', event.target.value)
                           setIdSocket(event.target.value)
                           store.setIdSocket(event.target.value)
                       }}
                />
                <button onClick={rekey}>Re key</button>
            </div>
            <div>
                <button onClick={connectID}>Connect</button>
            </div>
        </div>
    );
};
export default Dictaphone33;
