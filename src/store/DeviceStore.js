import {makeAutoObservable} from "mobx";

export default class DeviceStore {

    constructor() {
        this._username = 'user'
        this._webSocket = {}
        this._connected = false
        this._close = true
        this._faceControl = false
        this._accel = 1
        this._speedUD = 0
        this._speedLR = 0
        this._speech = ''
        this._lang = ''
        this._degreegoback = 0
        this._degreeleftright = 0
        this._delaycommand = 0
        makeAutoObservable(this)
    }

    get delaycommand() {return this._delaycommand;}
    setDelaycommand(value) {this._delaycommand = value;}

    get degreeleftright() {return this._degreeleftright;}
    setDegreeleftright(value) {this._degreeleftright = value;}

    get degreegoback() {return this._degreegoback;}
    setDegreegoback(value) {this._degreegoback = value;}

    get username() {return this._username;}
    setUsername(value) {this._username = value;}

    get webSocket() {return this._webSocket;}
    setWebSocket(value) {this._webSocket = value;}

    get connected() {return this._connected;}
    setConnected(value) {this._connected = value;}

    get close() {return this._close;}
    setClose(value) {this._close = value;}

    get faceControl() {return this._faceControl;}
    setFaceControl(value) {this._faceControl = value;}

    get accel() {return this._accel;}
    setAccel(value) {this._accel = value;}

    get speedUD() {return this._speedUD;}
    setSpeedUD(value) {this._speedUD = value;}

    get speedLR() {return this._speedLR;}
    setSpeedLR(value) {this._speedLR = value;}

    get speech() {return this._speech;}
    setSpeech(value) {this._speech = value;}

    get lang() {return this._lang;}
    setLang(value) {this._lang = value;}

}
