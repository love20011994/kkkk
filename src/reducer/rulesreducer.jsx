const reducers = (state = "default", action) => {
    switch (action.type) {
      case "condition":
        return action.payload;
  
      default:
        return false;
    }
  };
  export default reducers;
  