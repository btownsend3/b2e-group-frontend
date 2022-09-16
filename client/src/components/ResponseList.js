import {Button, Card, Form, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {submitGrade} from "../modules/reducer";

function ResponseList() {
    const dispatch = useDispatch()
    const responses = useSelector(state => state.currentQuiz.responses)
    const [grade, setGrade] = useState("")

    function handleGrade(id) {
        dispatch(submitGrade(id, grade))
    }

        const responseMap = responses?.map((res, index) => {
            return (
                    <Card key={index} className={'shadow p-3 m-4 bg-white rounded'} style={{width: "18rem"}}>
                        { res.answers?.map((answer, idx) => {
                            let answerArr = Object.entries(answer)[0].join(': ')
                            return (
                                <p key={idx}>{idx + 1}. {answerArr}</p>
                            )
                        })}
                        <Form.Label className={'w-50'}>Grade
                            <Form.Control type={"number"} onChange={(e) => setGrade(prev => e.target.value)} />
                            <Button variant={'primary'} onClick={() => handleGrade(res.id)}>Confirm</Button>
                        </Form.Label>
                    </Card>
                )
            })

    return (
        <>
            {responseMap}
        </>
    )
}

export default ResponseList