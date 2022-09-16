import {useState} from "react"
import {Button, Modal} from "react-bootstrap"
import TakeQuestion from "./TakeQuestion";
import {useDispatch} from "react-redux";
import {submitQuizResponse} from "../modules/reducer";

function TakeQuiz({quiz}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    function handleShow() {
        setShow(true)
        dispatch({type: "START_QUIZ", payload: quiz})
    }

    function handleSubmit() {
        dispatch(submitQuizResponse(quiz.id))
    }

    const questionMap = quiz.questions?.map((item, index) => {
        return (
            <div key={index}>
                <TakeQuestion question={item} index={index} />
                <hr/>
            </div>
        )
        return item
    })

    return (
        <>
            <Button variant="primary" style={{width: "fit-content", padding: ".5em"}} onClick={handleShow}>
                Take this quiz
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{quiz.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{quiz.description}</p>
                    <hr />
                    <br />
                    { questionMap && questionMap }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TakeQuiz