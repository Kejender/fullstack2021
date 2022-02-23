const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {
        good: state.good+1,
        ok: state.ok,
        bad: state.bad
      }
      console.log('good', newState)
      state = newState
      return state
    case 'OK':
      const newStateOK = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      console.log('ok', state)  
      state = newStateOK
    return state
    case 'BAD':
      const newStateBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad+1
      }
      console.log('bad', newStateBad)
      state = newStateBad
      return state
    case 'ZERO':
      console.log('ok', state)
      const newStateReset = {
        good: 0,
        ok: 0,
        bad: 0
      }
      state = newStateReset
      return state
    default: 
    console.log(state)
    return state
  }
  
}

export default counterReducer