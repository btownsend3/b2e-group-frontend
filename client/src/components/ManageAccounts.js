import {useState} from "react"
import {Button, Modal} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../modules/reducer";

function ManageAccounts() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    function handleShow() {
        setShow(true)
        dispatch(getUsers())
    }

    return (
        <>
            <p onClick={handleShow}>
                Manage user accounts
            </p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage users</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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

export default ManageAccounts