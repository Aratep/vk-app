
const currentCardState = {
    card: [],
};

export default function card(state = currentCardState, action) {
    if (action.type === "SET_CURRENT_CARD") {
      return {
        ...state,
        card: action.value,
      };
    }


    return state;
}
