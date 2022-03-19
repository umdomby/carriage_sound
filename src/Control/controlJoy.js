import {Control} from "./controlVoceButton";
import store from "../store/DeviceStore"

export const ControlJoy = (x, y) => {
    store.webSocket.send(JSON.stringify({
        id: store.idSocket,
        method: 'messages',
        message: x,
        message2: y,
        accel: 1,
        stop: 0
    }))

}




