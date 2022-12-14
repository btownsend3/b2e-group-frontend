import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import NavigationBar from "./components/NavigationBar"
import {useDispatch, useSelector} from "react-redux";
import CreateQuiz from "./components/CreateQuiz";
import CreateQuestion from "./components/CreateQuestion";
import {Button} from "react-bootstrap";
import QuizList from "./components/QuizList";
import AssignmentList from "./components/AssignmentList";
import ResponseList from "./components/ResponseList";

function App() {
    const dispatch = useDispatch()
    const takingQuiz = useSelector(state => state.takingQuiz)
    const view = useSelector(state => state.view)
    const stage = useSelector(state => state.stage)
    const permissionLevel = useSelector(state => state.permissionLevel)

  return (
    <div className="App">
      <NavigationBar />
        { stage == 0 && !takingQuiz && <CreateQuiz /> }
        { stage > 0 && !takingQuiz && <CreateQuestion /> }
        { permissionLevel > 0 && <AssignmentList /> }
        { view === "response" && <ResponseList /> }
        <QuizList />
    </div>
  )
}

export default App
