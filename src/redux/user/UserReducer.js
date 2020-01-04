import UserAdd from "./UserAdd";

const userList = {
  user: {
    fname: "",
    lname: "",
    email: "",
    gender: "",
    designation: "",
    address: "",
    phoneno: "",
    isFilled: true
  },

  userCount: 0
};

const UserReducer = (state = userList, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: state.user,
        userCount: state.userCount + 1
      };
    default:
      return state;
  }
};

export default UserReducer;
