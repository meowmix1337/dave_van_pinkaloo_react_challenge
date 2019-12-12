import { createStore, combineReducers } from 'redux'
import { app } from '../modules'

const store = createStore(
    combineReducers({ app }),
    {}
)

export default store