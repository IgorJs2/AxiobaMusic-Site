import {UserState, UserAction, UserActionTypes} from "../../types/user";

const initialState: UserState = {
    userInfo: {userId: "", username: ""},
    error: ''
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ERROR:
            return {...state, error: action.payload}
        case UserActionTypes.FETCH_USER:
            return {error: '', userInfo: action.payload}
        default:
            return state
    }
}