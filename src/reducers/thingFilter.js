export default function(state = false, action) {
  switch (action.type) {
    case "LIST_FILTER_START":
      return action.payload;
    default:
      return state;
  }
}