export const LeftRight = (webSocket, speedLR, idSocket) => {
    webSocket.send(JSON.stringify({
        id: idSocket,
        method: 'messages',
        message: speedLR,
        stop: 0
    }))
}

export const UpDown = (webSocket, speedUD, idSocket) => {
    webSocket.send(JSON.stringify({
        id: idSocket,
        method: 'messages',
        message2: speedUD,
        stop: 0
    }))
}

export const Stop = (webSocket, idSocket) => {
    webSocket.send(JSON.stringify({
        id: idSocket,
        method: 'messages',
        message: 0,
        message2: 0,
        stop: 1
    }))
}






