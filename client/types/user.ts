export interface IUser {
    userId: string,
    username: string,
}

export interface UserState {
    userInfo: IUser;
    error: string;
}

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
    payload: IUser
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string
}

export type UserAction = FetchUserAction | FetchUserErrorAction