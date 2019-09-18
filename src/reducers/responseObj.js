const objState = {
    responseObj: [],
};

export default function responseObj(state = objState, action) {
    if (action.type === "SET_RESPONSE_OBJ") {
      return {
        ...state,
        responseObj: action.value,
      };
    }


    return state;
}
