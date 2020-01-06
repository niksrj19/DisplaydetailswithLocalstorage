import UserAdd from "./UserAdd";
import GetDesignation from "./GetDesignation";
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

  userCount: 0,
  designation: [
    "Associate",
    "Sr. Associate",
    "Manager",
    "Sr. Manager",
    "Tech Lead",
    "Sr. Tech Lead"
  ]
};

const UserReducer = (state = userList, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: state.user,
        userCount: state.userCount + 1
      };
    case "GET_DESIGNATION": {
      return {
        ...state,
        user: state.user
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
