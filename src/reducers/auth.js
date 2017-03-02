import * as types from '../actions/types'
import isEmpty from 'lodash/isEmpty'
import initialState from './initialState'

export default function authReducer(state = initialState.auth, action){
  switch(action.type){
    case types.SET_CURRENT_USER:
      return {
        isAuth: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
}
