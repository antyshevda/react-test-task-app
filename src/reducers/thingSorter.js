const initialState = {columnId: 1, direction: true};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LIST_SORTER_START":
      return {
        columnId: action.payload.columnId,
        direction: action.payload.direction
      };
    default:
      return state
  }
}