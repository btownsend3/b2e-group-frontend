const USER_URL = "http://localhost:8080"
const QUIZ_URL = "http://localhost:8081"

const initialState = {
    userList: [],
    quizList: [],
    token: null,
    permissionLevel: 0, // 0: not logged in / 1: applicant / 2: recruiter / 3: admin
    errorMessage: null
}

export function getUsers() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/get-users`)
            let data = await res.json()
            dispatch({type: "GET_USERS", payload: data})
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
            dispatch({type: "GET_QUIZZES", payload: data})
        } catch (e) {
           dispatch({type: "FAILED", payload: "Failed to fetch quizzes"})
        }
    }
}

export function login(username, password) {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/login?username=${username}&password=${password}`)
            let data = await res.json()
            dispatch({type: "LOGIN", payload: data})
        } catch (e) {
           dispatch({type: "FAILED", payload: "Failed to log in"})
        }
    }
}

export function logout() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/token=${getState().token}`)
            dispatch({type: "LOGOUT"})
        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to log out"})
        }
    }
}

export function createAccount() {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(`${USER_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

        } catch (e) {
            dispatch({type: "FAILED", payload: "Failed to create acccount"})
        }
    }
}

export default function reducer(state = initialState, action) {
    state.errorMessage = null
    switch(action.type) {
        default:
            return state
    }
}