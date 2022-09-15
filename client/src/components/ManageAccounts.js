import {useState} from "react"
import {Button, Modal} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers} from "../modules/reducer";
import EditUser from "./EditUser";

function ManageAccounts() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userList)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    function handleShow() {
        setShow(true)
        dispatch(getUsers())
    }

    function handleDelete(username) {
        dispatch(deleteUser(username))
    }

    const userMap = users?.map((item, index) => {
        return (
            <>
                <div className={'d-flex justify-content-between'}>
                    <p>{item.role.toUpperCase()}: {item.username}</p>
                    <div className={'d-flex justify-content-end'}>
                        <EditUser user={item} />
                        <Button className={'mx-2'} variant={'danger'} onClick={() => handleDelete(item.username)}>Delete</Button>
                    </div>
                </div>
                <hr />
            </>
        )
    })

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

export default ManageAccounts