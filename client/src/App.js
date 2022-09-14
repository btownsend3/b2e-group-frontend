import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import NavigationBar from "./components/NavigationBar"
import CreateAccount from "./components/CreateAccount"
import {useSelector} from "react-redux";

function App() {
    const stage = useSelector(state => state.stage)

  return (
    <div className="App">
      <NavigationBar />
    </div>
  )
}

export default App
