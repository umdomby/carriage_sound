import store from "../store/DeviceStore"

const WebSocketProject = (id) => {

    try {
        //store.setWebSocket(new WebSocket('wss://servicerobot.pro:4433'))
        store.setWebSocket(new WebSocket('wss://umdom.by:4433'))

        store.webSocket.onopen = () => {
            store.webSocket.send(JSON.stringify({
                id: id,
                username: 'user',
                method: "connection",
                //ipaddress: store.ipaddress
            }))
        }
        store.webSocket.onmessage = (event) => {
            var s = event.data.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            s = s.replace(/[\u0000-\u0019]+/g, "");
            let msg = JSON.parse(s)

            if (store.webSocket.readyState !== store.webSocket.CLOSED && store.webSocket.readyState !== store.webSocket.CLOSING) {
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        console.log(msg.txt)
                        store.setDegreegoback(msg.degreegoback)
                        store.setDegreeleftright(msg.degreeleftright)
                        store.setDelaycommand(msg.delaycommand)
                        store.setAccel(msg.accel)
                        store.setLang(msg.languages)
                        //store.setIpaddress(msg.ipaddress)
                        console.log("store.degreegoback: " + store.degreegoback)
                        console.log("store.degreeleftright: " + store.degreeleftright)
                        console.log("store.delaycommand: " + store.delaycommand)
                        console.log("store.accel: " + store.accel)
                        console.log("store.languages: " + store.lang)
                        //console.log("store.ipaddress: " + msg.ipaddress)
                        break
                    case "online":
                        console.log(`online`)
                        break
                    case "degreegoback":
                        store.setDegreegoback(msg.degreegoback)
                        console.log("msg.degreegoback " + msg.degreegoback)
                        console.log("store.degreegoback " + store.degreegoback)
                        break
                    case "degreeleftright":
                        store.setDegreeleftright(msg.degreeleftright)
                        console.log("msg.degreeleftright " + msg.degreeleftright)
                        console.log("store.degreeleftright " + store.degreeleftright)
                        break
                    case "delaycommand":
                        store.setDelaycommand(msg.delaycommand)
                        console.log("msg.delaycommand " + msg.delaycommand)
                        console.log("store.delaycommand " + store.delaycommand)
                        break
                    case "accel":
                        store.setAccel(msg.accel)
                        console.log("msg.accel " + msg.accel)
                        console.log("store.accel " + store.accel)
                        break
                    case "languages":
                        store.setLang(msg.languages)
                        console.log("msg.languages " + msg.languages)
                        console.log("store.languages " + store.lang)
                        break
                    case "ipaddress":
                        store.setIpaddress(msg.ipaddress)
                        console.log("msg.ipaddress " + msg.ipaddress)
                        console.log("store.ipaddress " + store.ipaddress)
                        break
                    case "messages":
                        console.log("message " + msg.message + "  message2 " + msg.message2)
                        // for (var i in msg.clientsNoRepeatUsers){
                        //     console.log(msg.clientsNoRepeatUsers[i])
                        // }
                        break
                    default:
                        console.log('default ' + msg)
                }
            }
        }
    }catch (e) {
        console.log(e)
    }

    return ([])
}

export default WebSocketProject
