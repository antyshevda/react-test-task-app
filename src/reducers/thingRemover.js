export default function(state = {status: false}, action) {
  switch (action.type) {
    case "REMOVE_THING":
      return action.payload;
    case "REMOVE_THING_END":
      return action.payload;
    default:
      return state;
  }
}