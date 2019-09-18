
const cardsState = {
    cards: [],
};

export default function cards(state = cardsState, action) {
    if (action.type === "SET_LIST_CARDS") {
      return {
        ...state,
        cards: action.value,
      };
    }


    return state;
}
