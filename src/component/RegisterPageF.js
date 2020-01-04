import React from "react";
import UserAdd from "../redux/user/UserAdd";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function RegisterPageF(props) {
  let [user, setUser] = useState({
    fname: "hello",
    lname: "",
    email: "",
    gender: "",
    designation: "",
    address: "",
    phoneno: "",
    isFilled: true
  });
  let [users, serUsers] = useState([]);

  const setFormValues = e => {
    e.preventDefault();
    console.log(user);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      isFilled: true
    });
  };

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked  times`;
    console.log(user, "NItesh");
    localStorage.setItem("userList", JSON.stringify(users));
  }, [users]);

  const submitForm = e => {
    console.log("submit");
    e.preventDefault();
    // const router = useRouter();
    if (formFilled()) {
      console.log("COMPLETED");
      let u = [...users, user];
      // u.push(user);
      console.log(user);

      serUsers(users => [...users, user]);
      console.log("nites", users);

      // router.push("/display");
    } else {
      console.log("UNfilled");
      setUser({ ...user, isFilled: false });
    }
  };

  const formFilled = () => {
    console.log("formFilled");
    if (
      user.fname !== "" &&
      user.lname !== "" &&
      user.email !== "" &&
      user.gender !== "" &&
      user.designation !== "" &&
      user.address !== "" &&
      user.phoneno !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <form>
        <label>
          First Name
          {console.log(user.fname)}
          <input
            onChange={setFormValues}
            type="text"
            name="fname"
            value={user.fname}
          />{" "}
        </label>
        <br />
        <label>
          Last Name
          <input
            type="text"
            name="lname"
            onChange={setFormValues}
            value={user.lname}
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="text"
            name="email"
            onChange={setFormValues}
            value={user.email}
          />
        </label>
        <br />
        <label>
          Gender
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={setFormValues}
          />{" "}
          Male
          <input
            type="radio"
            onChange={setFormValues}
            name="gender"
            value="female"
          />{" "}
          Female
          <input
            type="radio"
            onChange={setFormValues}
            name="gender"
            value="other"
          />{" "}
          Other
        </label>
        <br />
        <label>
          Phone No.
          <input
            type="number"
            name="phoneno"
            onChange={setFormValues}
            value={user.phoneno}
          />{" "}
        </label>
        <br />
        <label>
          Address
          <textarea
            type="text"
            name="address"
            onChange={setFormValues}
            value={user.address}
          />{" "}
        </label>
        <br />
        <label>
          Designation
          <input
            type="text"
            name="designation"
            onChange={setFormValues}
            value={user.designation}
          />{" "}
        </label>

        <br />

        {user.isFilled ? "" : <h5>all fields are manditory</h5>}
        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
}
const mapStatetoProps = state => {
  return {
    userCount: state.userCount
  };
};

const mapDispatchToProp = dispatch => {
  return {
    UserAdd: () => dispatch(UserAdd())
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProp
)(RegisterPageF);
