import {useDispatch, useSelector} from "react-redux"
import {Button, Card} from "react-bootstrap"

function QuizList() {
    const dispatch = useDispatch()
    const quizzes = useSelector(state => state.quizList)

    function handleClick(index) {
        dispatch({type: "START_QUIZ", payload: index})
    }

    const quizMap = quizzes?.map((quiz, index) => {
        return (
            <Card className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Card.Text>{quiz.questions.length} questions</Card.Text>
                <Button variant={'primary'} onClick={() => handleClick(index)}>Take quiz</Button>
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