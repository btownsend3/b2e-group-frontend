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