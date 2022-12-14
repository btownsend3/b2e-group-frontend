import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../modules/reducer"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import ManageAccounts from "./ManageAccounts";

function NavigationBar() {
    const dispatch = useDispatch()
    const permissionLevel = useSelector(state => state.permissionLevel)
    const stage = useSelector(state => state.stage)
    // const stage = useSelector(state => state.stage)
    // const token = useSelector(state => state.token)

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><h2>B2E Group 2</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => dispatch({type: "HOME"})} href="#home">Home</Nav.Link>
                        { !permissionLevel && (
                            <>
                                <Nav.Link href="#link">
                                    <Login />
                                </Nav.Link>
                                <Nav.Link href="#link">
                                    <CreateAccount />
                                </Nav.Link>
                            </>
                        )}
                        { stage == null && permissionLevel > 2 && <Nav.Link onClick={() => dispatch({type: "STAGE_0"})}>Create Quiz</Nav.Link>}
                        { permissionLevel > 0 && (
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                { permissionLevel > 2 && (
                                    <NavDropdown.Item href="#action/3.2">
                                        <ManageAccounts />
                                    </NavDropdown.Item>
                                )}
                            { permissionLevel === 3 && (
                                <NavDropdown.Item href="#action/3.3">
                                    <CreateAccount />
                                </NavDropdown.Item>
                            )}
                            <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    <p onClick={() => dispatch(logout())}>Sign out</p>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar