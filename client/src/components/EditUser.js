import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import {editUser} from "../modules/reducer";
import {useDispatch, useSelector} from "react-redux";

function EditUser({user}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [role, setRole] = useState(user.role)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const errorMessage = useSelector(state => state.errorMessage)

    function handleSubmit() {
        user = { ...user, role}
        dispatch(editUser(user))
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select value={role} onChange={(e) => setRole(prev => e.target.value)}>
                        <option value={"admin"}>Admin</option>
                        <option value={"recruiter"}>Recruiter</option>
                        <option value={"applicant"}>Applicant</option>
                    </Form.Select>
                    { errorMessage && <p className={"text-danger"}>{errorMessage}</p> }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditUser