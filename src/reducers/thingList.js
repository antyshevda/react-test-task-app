export default function(state = [], action) {
  switch (action.type) {
    case "FETCH_DATA_FROM_SERVER":
      let things = action.payload;
      return things;
    default:
      return state;
  }
}