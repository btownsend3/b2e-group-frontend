import {Form} from 'react-bootstrap'
import {useState} from "react"

function TakeQuestion({question, index}) {
    const [text, setText] = useState("")
    const [choice, setChoice] = useState("")
    const [bool, setBool] = useState("")
    // const [choiceAll, setChoiceAll] = useState([])
    //
    // function handleChoiceAll(e) {
    //
    // }

    switch(question.type) {
        case "bool":
            return (
                <div>
                    <h6>{question.title}</h6>
                    <Form.Group>
                        <Form.Check value={"true"} label={"true"} onChange={(e) => setBool(e.target.value)} name={question.title} />
                        <Form.Check value={"false"} label={"false"} onChange={(e) => setBool(e.target.value)} name={question.title} />
                    </Form.Group>
                </div>
            )
        case "text":
            return (
                <div>
                    <h6>{question.title}</h6>
                    <Form.Group>
                        <Form.Control as={'textarea'} onChange={(e) => setText(prev => e.target.value)}/>
                    </Form.Group>
                </div>
            )
        case "choice":
            return (
                <div>
                    <h6>{question.title}</h6>
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