import {useState} from 'react'
import {Form} from "react-bootstrap";

function CreateQuiz() {
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
                    <Form.Control value={title} onChange={(e) => setTitle(prev => e.target.value)} />
                </Form.Label>
            </Form.Group>
        </Form>
    )

}

export default CreateQuiz