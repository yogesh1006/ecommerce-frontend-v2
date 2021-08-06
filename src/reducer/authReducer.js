export const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {

    case "SET_USER_LOGIN":
      return {
        token: action.payload
      };

    case "SET_USER_LOGOUT":
      return {
        token: "",
      };
    case "GET_USER":
      return {
        token: JSON.parse(localStorage.getItem("jwt")),
      };
    default:
      return  state ;
  }
};
