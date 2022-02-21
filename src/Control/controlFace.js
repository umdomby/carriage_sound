import {LeftRight, Stop, UpDown} from "./controlVoceButton";
import store from "../store/DeviceStore"

export const ControlFace = (props) => {


    if(store.faceControl === true) {
        switch (props.route) {
            case 'Up':
                UpDown(store.webSocket, -1, 'NGpeMkV',1)
                break
            case 'Down':
                UpDown(store.webSocket, 1, 'NGpeMkV',1)
                break
            case 'Left':
                LeftRight(store.webSocket, -1, 'NGpeMkV',1)
                break
            case 'Right':
                LeftRight(store.webSocket, 1, 'NGpeMkV',1)
                break
            case 'Stop':
                Stop(store.webSocket, 1)
                break;
        }
    }

    return([])
}




