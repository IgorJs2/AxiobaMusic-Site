import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {AnyAction, applyMiddleware} from "redux";
import {reducer, RootState} from "./reducers";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { legacy_createStore as createStore} from 'redux'

// @ts-ignore
const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// @ts-ignore
export const wrapper = createWrapper<RootState>(makeStore, {debug: false});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>