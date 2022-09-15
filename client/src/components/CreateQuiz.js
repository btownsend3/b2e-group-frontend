import {useState} from 'react'
import {Button, Form} from "react-bootstrap"
import {useDispatch} from "react-redux"

function CreateQuiz() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function handleTitle(e) {
        setTitle(prev => e.target.value)
        dispatch({type: "TITLE", payload: e.target.value})
    }

    function handleDescription(e) {
        setDescription(prev => e.target.value)
        dispatch({type: "DESCRIPTION", payload: e.target.value})
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label className={'w-100'}>
                    <Form.Control value={title} onChange={handleTitle} />
                </Form.Label>
            </Form.Group><Form.Group>
                <Form.Label className={'w-100'}>
                    <Form.Control value={description} onChange={handleDescription} />
                </Form.Label>
            </Form.Group>
            <Button variant={"primary"} onClick={() => dispatch({type: "NEXT"})}>Next</Button>
        </Form>
    )

}

export default CreateQuiz