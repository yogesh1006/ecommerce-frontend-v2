export const reducer = (state, action) => {
  console.log(state, action);
  switch (action) {
    case "SET_USER_LOGIN":
      return {
        ...state,
        token: action.payload,
      };

    case "SET_USER_LOGOUT":
      return {
        ...state,
        token: "",
      };
    default:
      return { state };
  }
};
