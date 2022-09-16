import {useSelector} from "react-redux";
import Response from "./Response";

function ResponseList() {
    const responses = useSelector(state => state.currentQuiz.responses)


        const responseMap = responses?.map((res, index) => <Response key={index} res={res} />)

    return (
        <>
            {responseMap}
        </>
    )
}

export default ResponseList