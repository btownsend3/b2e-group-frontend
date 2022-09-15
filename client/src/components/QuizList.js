import {useDispatch, useSelector} from "react-redux"
import {Button, Card} from "react-bootstrap"
import {deleteQuiz} from "../modules/reducer";
import TakeQuiz from "./TakeQuiz";

function QuizList() {
    const dispatch = useDispatch()
    const quizzes = useSelector(state => state.quizList)

    function handleClick(index) {
        dispatch({type: "START_QUIZ", payload: index})
    }

    function handleDelete(id) {
        dispatch(deleteQuiz(id))
    }

    const quizMap = quizzes?.map((quiz, index) => {
        return (
            <Card key={index} className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Card.Text>{quiz.questions.length} questions</Card.Text>
                {/*<Button variant={'primary'} onClick={() => handleClick(index)}>Take quiz</Button>*/}
                <AssignQuiz quiz={quiz} />
                <TakeQuiz quiz={quiz} />
                <Button variant={'danger'} onClick={() => handleDelete(quiz.id)}>Delete</Button>
            </Card>
        )
    })

    return (
        <div className={'d-flex flex-wrap'}>
            {quizMap}
        </div>
    )
}

export default QuizList