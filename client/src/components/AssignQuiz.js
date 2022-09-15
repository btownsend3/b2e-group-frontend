import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../modules/reducer";
import EditUser from "./EditUser";
import editUser from "./EditUser";

function AssignQuiz({quiz}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const users = useSelector(state => state.userList)
    const handleClose = () => setShow(false)

    function handleShow() {
        setShow(true)
        dispatch(getUsers())
    }

    function handleAssign(user) {
        user = { ...user, assignments: [...user.assignments, quiz]}
        dispatch(editUser(user))
    }

    const userMap = users?.map((user, index) => {
        return (
            <>
                <div className={'d-flex justify-content-between'}>
                    <p>{user.role.toUpperCase()}: {user.username}</p>
                    <Button className={'mx-2'} variant={'primary'} onClick={() => handleAssign(user)}>Assign</Button>
                </div>
                <hr />
            </>
        )
    })

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Assign quiz
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign: {quiz.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userMap}
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

export default AssignQuiz