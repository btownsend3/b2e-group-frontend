import {useDispatch, useSelector} from "react-redux"
import {Button, Card} from "react-bootstrap"
import TakeQuiz from "./TakeQuiz"

function AssignmentList() {
    const dispatch = useDispatch()
    const permissionLevel = useSelector(state => state.permissionLevel)
    const allQuizzes = useSelector(state => state.quizList)
    const quizzes = useSelector(state => state.assignmentList)
    const username = useSelector(state => state.username)



    const quizMap = quizzes?.map((quiz, index) => {
        let grade = allQuizzes.find(item => item.id == quiz.id).responses.find(item => item.username == username).grade
        if (!grade) {
            return (
                <Card key={index} className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                    <Card.Title>{quiz.title}</Card.Title>
                    <Card.Text>{quiz.description}</Card.Text>
                    <Card.Text>{quiz.questions.length} questions</Card.Text>
                    { permissionLevel > 0 && <TakeQuiz quiz={quiz}/>}
                </Card>
            )
        }
    })

    const gradedQuizMap = quizzes?.map((quiz, index) => {
        let grade = allQuizzes.find(item => item.id == quiz.id).responses.find(item => item.username == username).grade
        if (grade) {
            return (
                <Card key={index} className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                    <Card.Title>{quiz.title}</Card.Title>
                    <Card.Text>{quiz.description}</Card.Text>
                    <Card.Text>{quiz.questions.length} questions</Card.Text>
                    { grade && <Card.Text>Grade: {grade}/{quiz.questions.length}</Card.Text> }
                    { !grade && permissionLevel > 0 && <TakeQuiz quiz={quiz}/>}
                </Card>
            )
        }
    })

    if (quizMap.length === 0) {
        return (
            <></>
        )
    } else {
        return (
            <>
                <div className={'d-flex justify-content-around my-4'}>
                    <div className={'w-45'}>
                        <h3 className={'text-center'}>Assignments</h3>
                        <div className={'d-flex flex-wrap'}>
                            {quizMap}
                        </div>
                    </div>
                    <div className={'assignments-border'}/>
                    <div className={'w-45'}>
                        <h3 className={'text-center'}>Grades</h3>
                        <div className={'d-flex flex-wrap'}>
                            {gradedQuizMap}
                        </div>
                    </div>
                </div>
                <hr />
            </>
        )
    }

}

    export default AssignmentList