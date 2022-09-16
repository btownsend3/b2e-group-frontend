import {useDispatch, useSelector} from "react-redux"
import {Button, Card} from "react-bootstrap"
import {deleteQuiz} from "../modules/reducer";
import TakeQuiz from "./TakeQuiz";
import AssignQuiz from "./AssignQuiz";

function QuizList() {
    const dispatch = useDispatch()
    const permissionLevel = useSelector(state => state.permissionLevel)
    const quizzes = useSelector(state => state.quizList)

    function handleDelete(id) {
        dispatch(deleteQuiz(id))
    }

    function handleResponses(quiz) {
        dispatch({type: "VIEW_RESPONSES", payload: quiz})
    }

    const quizMap = quizzes?.map((quiz, index) => {
        return (
            <Card key={index} className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Card.Text>{quiz.questions.length} questions</Card.Text>
                { permissionLevel > 1 && <AssignQuiz quiz={quiz} /> }
                { permissionLevel > 0 && <TakeQuiz quiz={quiz} /> }
                { permissionLevel === 0 && <p>Please log in to take this quiz</p> }
                { permissionLevel > 2 && <Button variant={'primary'} onClick={() => handleResponses(quiz)} >Responses</Button> }
                { permissionLevel > 2 && <Button variant={'danger'} onClick={() => handleDelete(quiz.id)}>Delete</Button> }
            </Card>
        )
    })

    return (
        <>
            <h2 className={'text-center'}>All Quizzes</h2>
            <div className={'d-flex flex-wrap'}>
                {quizMap}
            </div>
        </>
    )
}

export default QuizList