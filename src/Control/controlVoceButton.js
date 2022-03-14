export const LeftRight = (webSocket, speedUD, speedLR, idSocket, accelState) => {
    webSocket.send(JSON.stringify({
        id: idSocket,
        method: 'messages',
        message: speedLR,
        message2: speedUD,
        accel: accelState,
        stop: 0
    }))
}

export const UpDown = (webSocket, speedUD, speedLR, idSocket, accelState) => {
    webSocket.send(JSON.stringify({
        id: idSocket,
        method: 'messages',
        message: speedLR,
        message2: speedUD,
        accel: accelState,
        stop: 0
    }))
}

export const Stop = (webSocket, idSocket, accelState) => {
    webSocket.send(JSON.stringify({
        id: idSocket,
        method: 'messages',
        message: 0,
        message2: 0,
        accel: accelState,
        stop: 1
    }))
}






