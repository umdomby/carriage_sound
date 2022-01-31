

export const LeftRight = (webSocket, speedLR, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        message: speedLR,
        accel: accel,
        stop: 0
    }))
}

export const UpDown = (webSocket, speedUD, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        message2: speedUD,
        accel: accel,
        stop: 0
    }))
}

export const Stop = (webSocket, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        message: 0,
        message2: 0,
        accel: accel,
        stop: 1
    }))
}

export const DegreeGoBack = (webSocket, speedUD) => {
    webSocket.send(JSON.stringify({
        method: 'degreegoback',
        degreegoback : speedUD
    }))
}

export const DegreeLeftRight = (webSocket, speedLR) => {
    webSocket.send(JSON.stringify({
        method: 'degreeleftright',
        degreeleftright: speedLR
    }))
}

export const daleyCommand = (webSocket, delay) => {
    webSocket.send(JSON.stringify({
        method: 'delaycommand',
        delaycommand: delay
    }))
}

export const accelF = (webSocket, accel) => {
    webSocket.send(JSON.stringify({
        method: 'accel',
        accel: accel
    }))
}

export const langF = (webSocket, languages) => {
    webSocket.send(JSON.stringify({
        method: 'languages',
        languages: languages
    }))
}







