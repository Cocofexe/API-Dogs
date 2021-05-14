import {GET_DOGS, GET_TEMPS, GET_DETAILS} from "../actions/actions.js"

const initialState={
    dog:[],
    temps:[],
    detail:[]
  }
  function rootReducer(state = initialState, action) {
    if (action.type === GET_DOGS) {
      return {
            ...state.dog,
            dog:action.payload
      }
    }
    if (action.type === GET_TEMPS) {
      return{
        ...state,
        temps:action.payload
      }
    }
    if (action.type === GET_DETAILS) {
      return{
        ...state.detail,
        detail:action.payload
      }
    }
    return state
  }

export default rootReducer;