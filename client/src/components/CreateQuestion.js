import {useEffect, useState} from "react"
import {Button, Form} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Question from "./Question"
import {createQuiza} from "../modules/reducer";

function CreateQuestion() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const stage = useSelector(state => state.stage)
    const currentQuiz = useSelector(state => state.currentQuiz)
    const questions = useSelector(state => state.currentQuiz.questions)

    const [prompt, setPrompt] = useState(currentQuiz[stage - 1] ? currentQuiz[stage - 1].title : "")
    const [questionType, setQuestionType] = useState(currentQuiz[stage - 1] ? currentQuiz[stage - 1].type : "bool")
    const [options, setOptions] = useState(currentQuiz[stage - 1] ? currentQuiz[stage - 1].answers : [])
    const [qty, setQty] = useState("0")

    useEffect(() => {
        dispatch({type: "PROMPT_EDIT", payload: prompt})
    }, [prompt])

    useEffect(() => {
        dispatch({type: "QUESTION_TYPE", payload: questionType})
    }, [questionType])

    // useEffect(() => {
    //     dispatch({type: "OPTION_EDIT", payload: options})
    // }, [options])
    
    useEffect(() => {
        dispatch({type: "QUANTITY", qty})
    }, [qty])

    function handleQty(e) {
        let num = parseInt(e.target.value)
        setQty(prev => e.target.value)
        let newOptions = [...options]

        while (newOptions.length < num) {
            newOptions.push(<Question index={newOptions.length} key={newOptions.length}/>)
            setOptions(prev => newOptions)
        }

        while (newOptions.length > num) {
            newOptions.pop()
            setOptions(prev => newOptions)
        }
    }

    function handleType(e) {
        setQuestionType(prev => e.target.value)
        if (!e.target.value.match("choice")) {
            setOptions(prev => [])
        }
    }

    function handleSubmit() {
        dispatch(createQuiza())
    }

    function handlePrompt(e) {
        setPrompt(prev => e.target.value)
        dispatch({type: "QUESTION_TITLE", payload: e.target.value})
    }

    const optionsMap = options?.map((item, index) => {
        return (
            <Question index={index} key={index} />
        )
    })

    useEffect(() => {
        setPrompt(prev => currentQuiz[stage - 1] ? currentQuiz[stage - 1].title : "")
    }, [stage])

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>
                        <Form.Control as={'textarea'} value={prompt} onChange={handlePrompt} />
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Question type
                        <Form.Select value={questionType} onChange={handleType}>
                            <option value={"bool"}>True/false</option>
                            {/*<option value={"choice"}>Multiple choice</option>*/}
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
                { options.length > 0 && optionsMap }
                <Button onClick={() => dispatch({type: "NEXT"})}>Next</Button>
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Form>
        </div>
    )
}

export default CreateQuestion