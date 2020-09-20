import { combineReducers } from 'redux'
import notes from './notes'
import PostsReducer from './code'
import AuthReducer from './authenticate'
import { reducer as formReducer } from 'redux-form'

const ponyApp = combineReducers({
  notes,
  auth: AuthReducer,
  posts: PostsReducer,
  form: formReducer,
})

export default ponyApp
