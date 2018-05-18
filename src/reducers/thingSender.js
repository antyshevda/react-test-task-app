export default function(state = {status: false}, action) {
  switch (action.type) {
    case "SEND_FORM_TO_SERVER":
      return action.payload;
    default:
      return state;
  }
}