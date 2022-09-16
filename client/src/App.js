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
        { stage == null && permissionLevel > 2 && <Button variant={'primary'} onClick={() => dispatch({type: "STAGE_0"})}>Create Quiz</Button>}
        { stage == 0 && !takingQuiz && <CreateQuiz /> }
        { stage > 0 && !takingQuiz && <CreateQuestion /> }
        { permissionLevel > 0 && <AssignmentList /> }
        { view === "response" && <ResponseList /> }
        { view === "response" && <h1>hello</h1>}
        <QuizList />
    </div>
  )
}

export default App
