const reducers = (state = "default", action) => {
  switch (action.type) {
    case "contractid":
      return action.payload;

    default:
      return false;
  }
};
export default reducers;
