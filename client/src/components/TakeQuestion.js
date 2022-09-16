import {Form} from 'react-bootstrap'
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux";

function TakeQuestion({question, index}) {
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const [choice, setChoice] = useState("")
    const [bool, setBool] = useState("")
    // const [choiceAll, setChoiceAll] = useState([])
    //
    // function handleChoiceAll(e) {
    //
    // }

    useEffect(() => {
        let obj = {text, question}
        dispatch({type: "UPDATE_TEXT", payload: obj})
    }, [text])

    useEffect(() => {
        let obj = {choice, question}
        dispatch({type: "UPDATE_CHOICE", payload: obj})
    }, [choice])

    useEffect(() => {
        let obj = {bool, question}
        dispatch({type: "UPDATE_BOOL", payload: obj})
    }, [bool])

    switch(question.type) {
        case "bool":
            return (
                <div>
                    <h6>{index + 1}. {question.title}</h6>
                    <Form.Group>
                        <Form.Check type={'radio'} value={"true"} label={"true"} onChange={(e) => setBool(e.target.value)} name={question.title} />
                        <Form.Check type={'radio'} value={"false"} label={"false"} onChange={(e) => setBool(e.target.value)} name={question.title} />
                    </Form.Group>
                </div>
            )
        case "text":
            return (
                <div>
                    <h6>{index + 1}. {question.title}</h6>
                    <Form.Group>
                        <Form.Control as={'textarea'} onChange={(e) => setText(prev => e.target.value)}/>
                    </Form.Group>
                </div>
            )
        case "choice":
            return (
                <div>
                    <h6>{index + 1}. {question.title}</h6>
                    <Form.Group>
                        <Form.Check type={'radio'} label={index} onChange={(e) => setChoice(e.target.value)} name={question.title} />
                    </Form.Group>
                </div>
            )
        // case "choice-all":
        //     return (
        //         <div>
        //             <h6>{question.title}</h6>
        //             <Form.Group>
        //                 <Form.Label>
        //                     <Form.Check type={'radio'} onChange={(e) => setChoiceAll(e.target.value)} />
        //                 </Form.Label>
        //             </Form.Group>
        //         </div>
        //     )
        default:
            return (
                <h6 className={'text-danger'}>Failed to get question</h6>
            )
    }

}

export default TakeQuestion