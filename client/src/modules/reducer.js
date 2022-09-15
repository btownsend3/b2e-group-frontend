import {handleNext, loginHelper} from "./utils";

const USER_URL = "http://localhost:8080"
const QUIZ_URL = "http://localhost:8081"

const initialState = {
    currentQuiz: {
        title: "",
        description: "",
        questions: []
    },
    userList: [],
    quizList: [],
    token: null,
    stage: null,
    permissionLevel: 0, // 0: not logged in / 1: applicant / 2: recruiter / 3: admin
    errorMessage: null,
    loginMessage: null
}

export function getUsers() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/get-users`)
            let data = await res.json()
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to fetch users"})
            } else {
                dispatch({type: "GET_USERS", payload: data})
            }
        } catch (e) {
           dispatch({type: "FAILED", payload: "Failed to fetch users"})
        }
    }
}

export function getQuizzes() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${QUIZ_URL}/get-quizzes`)
            let data = await res.json()
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to fetch quizzes"})
            } else {
                dispatch({type: "GET_QUIZZES", payload: data})
            }
        } catch (e) {
           dispatch({type: "FAILED", payload: "Failed to fetch quizzes"})
        }
    }
}

export function createQuiza() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${QUIZ_URL}/create?token=${getState().token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(getState().currentQuiz)
            })
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to create quiz"})
            } else {
                dispatch({type: "CREATE"})
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to create quiz"})
        }
    }
}

export function login(username, password) {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/login?username=${username}&password=${password}`)
            let data = await res.json()
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to log in with provided username and password"})
            } else {
                dispatch({type: "LOGIN", payload: data})
            }
        } catch (e) {
           dispatch({type: "FAILED", payload: "Failed to log in"})
        }
    }
}

export function logout() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/logout/token=${getState().token}`)
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to log out"})
            } else {
                dispatch({type: "LOGOUT"})
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to log out"})
        }
    }
}

export function createAccount(username, password, role) {
    return async (dispatch, getState) => {
        let user = { username, password, role }
        try {
            let res
            if (role != "applicant") {
                res = await fetch(`${USER_URL}/admin-create?token=${getState().token}&username=${username}&password=${password}&role=${role}`)
            } else {
                res = await fetch(`${USER_URL}/create?username=${username}&password=${password}`)
            }
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to create account"})
            } else {
                dispatch({type: "CREATE"})
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to create account"})
        }
    }
}

export default function reducer(state = initialState, action) {
    state.errorMessage = null
    state.loginMessage = null
    switch(action.type) {
        case "LOGIN":
            return loginHelper(state, action)
        case "LOGOUT":
            return { ...state, token: null }
        case "CREATE":
            return state
        case "GET_QUIZZES":
            return { ...state, quizList: action.payload }
        case "GET_USERS":
            return { ...state, userList: action.payload }
        case "START_QUIZ":
            return { ...state, currentQuiz: state.quizList[action.payload], stage: 1 }
        case "FAILED":
            return { ...state, errorMessage: action.payload }
        // case "NEXT_STAGE":
        //     return {
        //         ...state,
        //         stage: state.stage + 1
        //     }
        case "STAGE_0":
            return { ...state, stage: 0 }
        case "QUESTION":
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: action.payload
                }
            }
        case "QUESTION_TITLE":
            let newQuestions = [...state.currentQuiz.questions]
            newQuestions[state.stage - 1] = { ...state.currentQuiz.questions[state.stage - 1], title: action.payload }
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: newQuestions
                }
            }
        case "QUANTITY":
            return {
                ...state,

            }
        case "NEXT":
            return handleNext(state)
        case "TITLE":
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    title: action.payload
                }
            }
        case "DESCRIPTION":
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    description: action.payload
                }
            }
        default:
            return state
    }
}