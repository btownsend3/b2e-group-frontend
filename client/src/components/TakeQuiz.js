import {useState} from "react"
import {Button, Modal} from "react-bootstrap"
import TakeQuestion from "./TakeQuestion";

function TakeQuiz({quiz}) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const questionMap = quiz.questions?.map((item, index) => {
        return (
            <TakeQuestion key={index} question={item} index={index} />
        )
        return item
    })

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
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
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TakeQuiz