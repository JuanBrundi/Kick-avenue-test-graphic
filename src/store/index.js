import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import sellingDataReducer from './reducers/sellingDataReducers'

const reducers = combineReducers({
  sellingDataReducer
})

const middlewares = applyMiddleware(thunk)

const store = createStore(reducers, middlewares)

export default store