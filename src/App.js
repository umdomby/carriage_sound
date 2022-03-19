import './App.css';
import {observer} from "mobx-react-lite";
import Dictaphone33 from "./components/Dictaphone33";
import CameraFaceDetect from "./views/cameraFaceDetect";

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
// import Main from './components/VideoChat/Main/Main';
// import Room from './components/VideoChat/Room/Room';
import React, {useEffect} from "react";
import Demonstration from "./components/Joy/Demonstration"
import Video from "./components/Video/Video";
import WebSocketProject from "./components/WebSocketProject";

const App = observer(() => {

    useEffect(()=>{
        WebSocketProject('123')
    },[])

  return (
      <div className="App">
          <div className="Joy">
              <Demonstration />
          </div>
          <div>
              <Video/>
          </div>
          <div>
              {/*<CameraFaceDetect/>*/}

              {/*<Dictaphone33/>*/}
              {/*<BrowserRouter>*/}
              {/*    <AppContainer>*/}
              {/*        <Switch>*/}
              {/*            <Route exact path="/" component={Main} />*/}
              {/*            <Route exact path="/room/:roomId" component={Room} />*/}
              {/*        </Switch>*/}
              {/*    </AppContainer>*/}
              {/*</BrowserRouter>*/}
          </div>
      </div>
  );
});

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  background-color: #454552;
  text-align: center;
`;

export default App;

