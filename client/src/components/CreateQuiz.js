import {useState} from 'react'
import {Button, Form} from "react-bootstrap"
import {useDispatch} from "react-redux"

function CreateQuiz() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <Form>
            <Form.Group>
                <Form.Label className={'w-100'}>
                    <Form.Control value={description} onChange={(e) => setTitle(prev => e.target.value)} />
                </Form.Label>
            </Form.Group><Form.Group>
                <Form.Label className={'w-100'}>
                    <Form.Control value={title} onChange={(e) => setDescription(prev => e.target.value)} />
                </Form.Label>
            </Form.Group>
            <Button variant={"primary"} onClick={() => dispatch({type: "NEXT_STAGE"})}>Next</Button>
        </Form>
    )

}

export default CreateQuiz