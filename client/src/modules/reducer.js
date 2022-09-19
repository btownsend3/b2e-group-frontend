import {handleNext, loginHelper} from "./utils";

const USER_URL = "http://localhost:8080"
const QUIZ_URL = "http://localhost:8081"

const initialState = {
    currentQuiz: {
        title: "",
        description: "",
        questions: [],
        responses: []
    },
    username: null,
    view: "home",
    assignmentList: [],
    userList: [],
    quizList: [],
    token: null,
    stage: null,
    takingQuiz: false,
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

export function deleteUser(username) {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/delete?token=${getState().token}&username=${username}`)
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to delete user " + username})
            } else {
                dispatch({type: "DELETE_USER"})
                dispatch(getUsers())
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to delete user " + username})
        }
    }
}

export function editUser(user) {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/edit?token=${getState().token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to edit user"})
            } else {
                dispatch({type: "EDIT_USER"})
                dispatch(getUsers())
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to edit user"})
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

export function createQuiz() {
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

export function editQuiz() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${QUIZ_URL}/edit?token=${getState().token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(getState().currentQuiz)
            })
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to edit quiz"})
        }
    }
}

export function submitQuizResponse(id) {
    return async (dispatch, getState) => {
        let responseAnswers = getState().currentQuiz.responses.find(item => item.token === getState().token)
        delete responseAnswers.token
        let answerArr = []
        for (let [key, value] of Object.entries(responseAnswers)) {
            answerArr.push({[key]: value})
        }
        let response = { ...getState().currentQuiz.responses[getState().currentQuiz.responses.length - 1], username: getState().username, answers: answerArr, grade: null }
        try {
            let res = await fetch(`${QUIZ_URL}/add-response?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(response)
            })
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to submit response"})
            } else {
                dispatch({type: "SUBMIT_QUIZ_RESPONSE"})
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to submit response"})
        }
    }
}

export function deleteQuiz(id) {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${QUIZ_URL}/delete?id=${id}`)
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to delete quiz"})
            } else {
                dispatch({type: "DELETE"})
                dispatch(getQuizzes())
            }

        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to delete quiz"})
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
                dispatch({type: "LOGIN", payload: { data, username }})
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to log in"})
        }
    }
}

export function logout() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/logout?token=${getState().token}`)
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

export function submitGrade(id, grade) {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${QUIZ_URL}/grade?id=${id}&grade=${grade}`)
            if (!res.ok) {
                dispatch({type: "FAILED", payload: "Failed to submit grade"})
            } else {
                dispatch({type: "SUBMIT_GRADE"})
            }
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to submit grade"})
        }
    }
}

export default function reducer(state = initialState, action) {
    state.errorMessage = null
    state.loginMessage = null
    switch (action.type) {
        case "LOGIN":
            return loginHelper(state, action)
        case "LOGOUT":
            return {...state, token: null, permissionLevel: 0}
        case "CREATE":
            return { ...state,
                stage: null,
                currentQuiz: {
                    title: "",
                    description: "",
                    questions: [],
                    responses: []
                },
                view: "home"
            }
        case "GET_QUIZZES":
            return { ...state, quizList: action.payload }
        case "GET_USERS":
            return { ...state, userList: action.payload }
        case "START_QUIZ":
            return { ...state, currentQuiz: action.payload, stage: 1, takingQuiz: true }
        case "EDIT_QUIZ":
            return { ...state, currentQuiz: action.payload, stage: 0, takingQuiz: false }
        case "SUBMIT_QUIZ_RESPONSE":
            return { ...state, takingQuiz: false, currentQuiz: {
                    title: "",
                    description: "",
                    questions: [],
                    responses: []
                }
            }
        case "FAILED":
            return { ...state, errorMessage: action.payload }
        // case "NEXT_STAGE":
        //     return {
        //         ...state,
        //         stage: state.stage + 1
        //     }
        case "STAGE_0":
            return {...state, stage: 0}
        case "QUESTION":
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: action.payload
                }
            }
        case "QUESTION_TYPE": {
            let newQuestions = [...state.currentQuiz.questions]
            newQuestions[state.stage - 1] = {...state.currentQuiz.questions[state.stage - 1], type: action.payload}
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: newQuestions
                }
            }
        }
        case "QUESTION_TITLE": {
            let newQuestions = [...state.currentQuiz.questions]
            newQuestions[state.stage - 1] = {...state.currentQuiz.questions[state.stage - 1], title: action.payload}
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    questions: newQuestions
                }
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
        case "UPDATE_TEXT": {
            let responseCopy = [...state.currentQuiz.responses]
            let response = state.currentQuiz.responses.find(item => item.token === state.token)
            if (!response) {
                responseCopy = [...state.currentQuiz.responses, {token: state.token}]
            }
            responseCopy[responseCopy.indexOf(response)] = {
                ...responseCopy[responseCopy.indexOf(response)],
                [action.payload.question.title]: action.payload.text
            }
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    username: state.username,
                    responses: responseCopy
                }
            }
        }
        case "UPDATE_CHOICE": {
            let responseCopy = [...state.currentQuiz.responses]
            let response = state.currentQuiz.responses.find(item => item.token === state.token)
            if (!response) {
                responseCopy = [...state.currentQuiz.responses, {token: state.token}]
            }
            responseCopy[responseCopy.indexOf(response)] = {
                ...responseCopy[responseCopy.indexOf(response)],
                [action.payload.question.title]: action.payload.choice
            }
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    username: state.username,
                    responses: responseCopy
                }
            }
        }
        case "UPDATE_BOOL": {
            let responseCopy = [...state.currentQuiz.responses]
            let response = state.currentQuiz.responses.find(item => item.token === state.token)
            if (!response) {
                responseCopy = [...state.currentQuiz.responses, {token: state.token}]
            }
            responseCopy[responseCopy.indexOf(response)] = {
                ...responseCopy[responseCopy.indexOf(response)],
                [action.payload.question.title]: action.payload.bool
            }
            return {
                ...state,
                currentQuiz: {
                    ...state.currentQuiz,
                    username: state.username,
                    responses: responseCopy
                }
            }
        }
        case "VIEW_RESPONSES":
            return { ...state, view: "response", currentQuiz: action.payload }
        case "HOME":
            return { ...state, view: "home", stage: null }
        default:
            return state
    }
}