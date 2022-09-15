import Question from "../components/Question";

export function loginHelper(state, action) {
    let permLvl
    switch(action.payload.role) {
        case "applicant": permLvl = 1; break
        case "recruiter": permLvl = 2; break
        case "admin": permLvl = 3; break
        default: permLvl = 0; break
    }
    return {
        ...state,
        token: action.payload.token,
        permissionLevel: permLvl,
        loginMessage: "You are now logged in"
    }
}

export function handleNext(state) {
    let {stage} = state
    let questions = state.currentQuiz.questions

    return {
        ...state,
        stage: state.stage + 1,
        title: questions[stage] ? questions[stage].title : "",
        type: questions[stage] ? questions[stage].promptType : "bool",
        qty: questions[stage] ? questions[stage].answers.length : "0",
        // validOptions: questions[stage] ? new Array(questions[stage].answers.length).fill(true) : [],
        // optionComponents: questions[stage].answers.map((item, index) => {
        //     return <Question key={index} index={index}/>
        // })
    }
}