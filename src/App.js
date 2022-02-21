import './App.css';
import {observer} from "mobx-react-lite";
import Dictaphone33 from "./components/Dictaphone33";
import CameraFaceDetect from "./views/cameraFaceDetect";



const App = observer(() => {
  return (
      <div style={{textAlign:'center'}}>
          <CameraFaceDetect/>
          <Dictaphone33/>
      </div>
  );
});

export default App;

