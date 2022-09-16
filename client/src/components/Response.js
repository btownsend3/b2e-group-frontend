import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {submitGrade} from "../modules/reducer";
import {useDispatch} from "react-redux";

function Response(props) {
    const dispatch = useDispatch()
    const [grade, setGrade] = useState(props.res.grade ? props.res.grade : "")

    function handleGrade(id) {
        dispatch(submitGrade(id, grade))
    }

    return (
        <Card className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
            { props.res.answers?.map((answer, idx) => {
                let answerArr = Object.entries(answer)[0].join(': ')
                return (
                    <p key={idx}>{idx + 1}. {answerArr}</p>
                )
            })}

            <Form.Label className={'w-100'}>Grade
                <div className={'d-flex'}>
                    <Form.Control type={"number"} value={grade} onChange={(e) => setGrade(prev => e.target.value)} />
                    <Button className={'mx-2'} variant={'primary'} onClick={() => handleGrade(props.res.id)}>Confirm</Button>
                </div>
            </Form.Label>
        </Card>
    )
}

export default Response