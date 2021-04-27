import './App.css';
import {BrowserRouter} from "react-router-dom";
import Navigator from "./navigation/Navigator";

function App() {
  return (
    <BrowserRouter>
      <Navigator/>
    </BrowserRouter>
  );
}

export default App;
