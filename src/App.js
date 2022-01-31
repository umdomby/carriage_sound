import './App.css';
import WebSocketProject from './components/WebSocketProject'
import {observer} from "mobx-react-lite";
import Dictaphone33 from "./components/Dictaphone33";



const App = observer(() => {
  return (
      <div style={{textAlign:'center'}}>
        <WebSocketProject/>
        <Dictaphone33/>
      </div>
  );
});

export default App;

