import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

function CreateQuestion() {
    const dispatch = useDispatch()
    const currentQuestion = useSelector(state => state.currentQuiz.questions[state.stage])
    const [prompt, setPrompt] = useState(currentQuestion.title ? currentQuestion.title : "")
    const [questionType, setQuestionType] = useState(currentQuestion.type ? currentQuestion.type : "bool")
    const [options, setOptions] = useState(currentQuestion.options)
    const [qty, setQty] = useState("0")

    useEffect(() => {
        dispatch({type: "PROMPT_EDIT", payload: prompt})
    }, [prompt])

    useEffect(() => {
        dispatch({type: "QUESTION_TYPE", payload: questionType})
    }, [questionType])

    useEffect(() => {
        dispatch({type: "OPTION_EDIT", payload: options})
    }, [options])

    function handleQty(e) {
        let num = parseInt(e.target.value)
        while (options.length < num) {
            setOptions(prev => [...prev, ""])
        }

        let newOptions = [...options]
        while (options.length > num) {
            newOptions.pop()
            setOptions(prev => newOptions)
        }

    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>
                        <Form.Control as={'textarea'} value={prompt} onChange={(e) => setPrompt(prev => e.target.value)} />
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Question type
                        <Form.Select value={questionType} onChange={(e) => setQuestionType(prev => e.target.value)}>
                            <option value={"bool"}>True/false</option>
                            <option value={"choice"}>Multiple choice</option>
                            <option value={"text"}>Text</option>
                        </Form.Select>
                    </Form.Label>
                    { questionType.match("choice") && (
                        <Form.Label>
                            <Form.Control type={"number"} value={qty} onChange={handleQty} min={3} max={26} />
                        </Form.Label>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>

                    </Form.Label>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateQuestion