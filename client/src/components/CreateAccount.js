import {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Button, Modal, Form} from "react-bootstrap"
import {createAccount} from "../modules/reducer"

function CreateAccount() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [userRole, setUserRole] = useState("applicant")
    const permissionLevel = useSelector(state => state.permissionLevel)
    const [show, setShow] = useState(false)

    function handleClose() {
        setMessage(prev => "")
        setUsername(prev => "")
        setPassword(prev => "")
        setUserRole("applicant")
        setShow(false)
    }

    function handleShow()  {
        setShow(true)
    }

    function handleSubmit() {
        if (!username) {
            setMessage(prev => "Please enter a username")
            return
        } else if (!password) {
            setMessage(prev => "Please enter a password")
            return
        }
        dispatch(createAccount(username, password, userRole))
    }

    return (
        <>
            <p onClick={handleShow}>
                Create an account
            </p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className={"w-100"}>Username
                                <Form.Control onChange={(e) => setUsername(prev => e.target.value)} />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={"w-100"}>Password
                                <Form.Control type={'password'} onChange={(e) => setPassword(prev => e.target.value)} />
                            </Form.Label>
                        </Form.Group>

                        { permissionLevel === 3 && (
                            <Form.Group>
                                <Form.Label>Select user level
                                    <Form.select value={userRole} onChange={(e) => setUserRole(prev => e.target.value)}>
                                        <option value={"applicant"}>Applicant</option>
                                        <option value={"recruiter"}>Recruiter</option>
                                        <option value={"admin"}>Admin</option>
                                    </Form.select>
                                </Form.Label>
                            </Form.Group>
                        )}

                        { message && <p>{message}</p> }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateAccount