import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  user: require('./user').default,
  products: require('./products').default,
  orders: require('./order').default
})

export default rootReducer
