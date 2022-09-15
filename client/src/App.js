import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import NavigationBar from "./components/NavigationBar"
import CreateAccount from "./components/CreateAccount"
import {useDispatch, useSelector} from "react-redux";
import CreateQuiz from "./components/CreateQuiz";
import CreateQuestion from "./components/CreateQuestion";
import {Button} from "react-bootstrap";
import QuizList from "./components/QuizList";

function App() {
    const dispatch = useDispatch()
    const stage = useSelector(state => state.stage)

  return (
    <div className="App">
      <NavigationBar />
        { stage == null && <Button variant={'primary'} onClick={() => dispatch({type: "STAGE_0"})}>Create Quiz</Button>}
        { stage == 0 && <CreateQuiz /> }
        { stage > 0 && <CreateQuestion /> }
        <QuizList />
    </div>
  )
}

export default App
