import {useState} from 'react'
import {Form} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"

function Question(props) {
    const dispatch = useDispatch()
    const currentQuiz = useSelector(state => state.currentQuiz)
    const stage = useSelector(state => state.stage)
    const abcArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")
    const [text, setText] = useState("")

    function handleChange(e) {
        setText(prev => e.target.value)
        let newAnswers = [...currentQuiz.questions]
        newAnswers[stage - 1].answers[props.index] = e.target.value
        dispatch({type: "QUESTION", payload: newAnswers})
    }

    return (
        <Form.Group>
            <Form.Label className={'w-100'}>{ abcArr[props.index] }
                <Form.Control onChange={handleChange} value={text} />
            </Form.Label>
        </Form.Group>
    )
}

export default Question