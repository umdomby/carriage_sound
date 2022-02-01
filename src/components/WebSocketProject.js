import React, {useContext, useEffect} from 'react';
import {Context} from "../index";


const WebSocketProject = () => {

    const {device} = useContext(Context)

    useEffect(()=>{
        wsConnect('user')
        setInterval(() => socketTest(), 5000)
    },[])

    const wsConnect = (username) => {
        try {
            device.setWebSocket(new WebSocket(process.env.REACT_APP_API_URL_WS))
            device.webSocket.onopen = () => {
                device.webSocket.send(JSON.stringify({
                    username: username,
                    method: "connection",
                }))
            }
            device.webSocket.onmessage = (event) => {
                var s = event.data.replace(/\\n/g, "\\n")
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, "\\&")
                    .replace(/\\r/g, "\\r")
                    .replace(/\\t/g, "\\t")
                    .replace(/\\b/g, "\\b")
                    .replace(/\\f/g, "\\f");
                // remove non-printable and other non-valid JSON chars
                s = s.replace(/[\u0000-\u0019]+/g,"");
                let msg = JSON.parse(s)

                if(device.webSocket.readyState !== device.webSocket.CLOSED && device.webSocket.readyState !== device.webSocket.CLOSING) {
                    switch (msg.method) {
                        case "connection":
                            console.log(`пользователь ${msg.username} присоединился`)
                            console.log(msg.txt)
                            device.setDegreegoback(msg.degreegoback)
                            device.setDegreeleftright(msg.degreeleftright)
                            device.setDelaycommand(msg.delaycommand)
                            device.setAccel(msg.accel)
                            device.setLang(msg.languages)
                            console.log("device.degreegoback: " + device.degreegoback)
                            console.log("device.degreeleftright: " + device.degreeleftright)
                            console.log("device.delaycommand: " + device.delaycommand)
                            console.log("device.accel: " + device.accel)
                            console.log("device.languages: " + device.lang)
                            break
                        case "online":
                            console.log(`online`)
                            break
                        case "degreegoback":
                            device.setDegreegoback(msg.degreegoback)
                            console.log("msg.degreegoback " + msg.degreegoback)
                            console.log("device.degreegoback " + device.degreegoback)
                            break
                        case "degreeleftright":
                            device.setDegreeleftright(msg.degreeleftright)
                            console.log("msg.degreeleftright " + msg.degreeleftright)
                            console.log("device.degreeleftright " + device.degreeleftright)
                            break
                        case "delaycommand":
                            device.setDelaycommand(msg.delaycommand)
                            console.log("msg.delaycommand " + msg.delaycommand)
                            console.log("device.delaycommand " + device.delaycommand)
                            break
                        case "accel":
                            device.setAccel(msg.accel)
                            console.log("msg.accel " + msg.accel)
                            console.log("device.accel " + device.accel)
                            break
                        case "languages":
                            device.setLang(msg.languages)
                            console.log("msg.languages " + msg.languages)
                            console.log("device.languages " + device.lang)
                            break
                        case "messages":
                            console.log("message "+ msg.message + "  message2 " + msg.message2)
                            // for (var i in msg.clientsNoRepeatUsers){
                            //     console.log(msg.clientsNoRepeatUsers[i])
                            // }
                            break
                        default:
                            console.log('default '+ msg)
                    }
                }
            }
        }catch (e) {
            console.log('WebSocket Error ' + e)
        }
    }

    const socketTest = () => {
        if (device.webSocket.readyState === device.webSocket.CLOSED || device.webSocket.readyState === device.webSocket.CLOSING) {
            //if(device.username !== '' && device.connected === true) {
                wsConnect('user')
                console.log('WebSocket reconnected ' + 'user')
            // }else{
            //     //console.log('WebSocket no connected')
            // }
        } else {
            //console.log('WebSocket connected')
        }
    }

    return ([])
}

export default WebSocketProject
