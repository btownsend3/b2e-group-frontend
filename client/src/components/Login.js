import {useState} from "react"
import {Button, Modal, Form} from "react-bootstrap"
import {login} from "../modules/reducer"
import {useDispatch} from "react-redux"

function Login() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    function handleClose() {
        setMessage(prev => "")
        setUsername(prev => "")
        setPassword(prev => "")
        setShow(false)
    }
    const handleShow = () => setShow(true)

    function handleLogin() {
        setMessage(prev => "")
        if (!username) {
            setMessage(prev => "Please enter your username")
            return
        } else if (!password) {
            setMessage(prev => "Please enter your username")
            return
        }
        dispatch(login(username, password))
    }

    return (
        <>
            <p onClick={handleShow}>
                Login
            </p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className={'w-100'}>Username
                                <Form.Control onChange={(e) => setUsername(prev => e.target.value)} />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={'w-100'}>Password
                                <Form.Control type={'password'} onChange={(e) => setPassword(prev => e.target.value)} />
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Log in
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login