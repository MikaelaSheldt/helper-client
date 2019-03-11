import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' // https://github.com/gaearon/redux-thunk
import axios from 'axios'

import reducer from './reducer'

export default createStore(
  reducer,
  applyMiddleware(thunk)
)
