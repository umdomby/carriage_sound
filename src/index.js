import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import DeviceStore from "./store/DeviceStore";
//export const Context = createContext(null)

ReactDOM.render(
    // <Context.Provider value={{
    //     device: new DeviceStore()
    // }}>
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // </Context.Provider>,
    document.getElementById('root')
);
