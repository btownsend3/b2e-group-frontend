import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import NavigationBar from "./components/NavigationBar"
import CreateAccount from "./components/CreateAccount";

function App() {
  return (
    <div className="App">
      <NavigationBar />
        <CreateAccount />
    </div>
  )
}

export default App
