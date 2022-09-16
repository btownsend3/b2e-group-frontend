import {useState} from 'react'
import {Button, Card, Form} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"

function CreateQuiz() {
    const dispatch = useDispatch()
    const currentQuiz = useSelector(state => state.currentQuiz)
    const [title, setTitle] = useState(currentQuiz.title ? currentQuiz.title : "")
    const [description, setDescription] = useState(currentQuiz.description ? currentQuiz.description : "")

    function handleTitle(e) {
        setTitle(prev => e.target.value)
        dispatch({type: "TITLE", payload: e.target.value})
    }

    function handleDescription(e) {
        setDescription(prev => e.target.value)
        dispatch({type: "DESCRIPTION", payload: e.target.value})
    }

    return (
        <Form className={'d-flex flex-column justify-content-center w-25 m-auto'}>
            <Card className={'shadow p-3 m-4 bg-white rounded'}>
                <Card.Title className={'text-center'}>Create new quiz</Card.Title>
                <Form.Group>
                    <Form.Label className={'w-100'}>Title
                        <Form.Control value={title} onChange={handleTitle} />
                    </Form.Label>
                </Form.Group><Form.Group>
                    <Form.Label className={'w-100'}>Description
                        <Form.Control value={description} onChange={handleDescription} />
                    </Form.Label>
                </Form.Group>
                <Button style={{width: "fit-content", padding: ".5em"}} variant={"primary"} onClick={() => dispatch({type: "NEXT"})}>Next</Button>
            </Card>
        </Form>
    )

}

export default CreateQuiz