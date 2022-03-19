import {Control, LeftRight, Stop, UpDown} from "./controlVoceButton";
import store from "../store/DeviceStore"

export const ControlFace = (props) => {


    if(store.faceControl === true) {
        switch (props.route) {
            case 'Up':
                Control(store.webSocket, -1,0, store.idSocket,1)
                break
            case 'Down':
                Control(store.webSocket, 1, 0, store.idSocket,1)
                break
            case 'Left':
                Control(store.webSocket, 0,-1, store.idSocket,1)
                break
            case 'Right':
                Control(store.webSocket, 0,1, store.idSocket,1)
                break
            case 'Stop':
                Stop(store.webSocket, store.idSocket, 1)
                break;
        }
    }

    return([])
}




