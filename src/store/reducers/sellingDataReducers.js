const initialState = {
  sellingData: []
}

function sellingDataReducer(state = initialState, action) {
  switch(action.type){
    case "FETCH_SELLING_DATA":
      return {
        ...state,
        sellingData: action.payload
      }
    default: 
      return state
  }
}

export default sellingDataReducer