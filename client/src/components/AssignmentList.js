import {useDispatch, useSelector} from "react-redux"
import {Button, Card} from "react-bootstrap"
import TakeQuiz from "./TakeQuiz"

function AssignmentList() {
    const dispatch = useDispatch()
    const permissionLevel = useSelector(state => state.permissionLevel)
    const quizzes = useSelector(state => state.assignmentList)

    const quizMap = quizzes?.map((quiz, index) => {
        return (
            <Card key={index} className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Card.Text>{quiz.questions.length} questions</Card.Text>
                {permissionLevel > 0 && <TakeQuiz quiz={quiz}/>}
            </Card>
        )
    })

    if (quizMap.length === 0) {
        return (
            <></>
        )
    } else {
        return (
            <>
                <h3 className={'text-center'}>Assignments</h3>
                <div className={'d-flex flex-wrap'}>
                    {quizMap}
                </div>
                <hr />
            </>
        )
    }

}

    export default AssignmentList