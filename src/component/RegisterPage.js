import React from "react";
import UserAdd from "../redux/user/UserAdd";
import { connect } from "react-redux";
import DisplayUser from "./DisplayUser";
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      users: []
    };
  }

  setFormValues = e => {
    e.preventDefault();

    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
        isFilled: true
      }
    });
  };

  submitForm = e => {
    e.preventDefault();

    if (this.formFilled()) {
      console.log("COMPLETED");
      let u = [...this.state.users];
      u.push(this.state.user);
      this.setState(
        {
          users: u
        },
        () => {
          localStorage.setItem("userList", JSON.stringify(this.state.users));
        }
      );
    } else {
      console.log("UNfilled");
      this.setState({
        user: { ...this.state.user, isFilled: false }
      });
    }
  };

  formFilled = () => {
    if (
      this.state.user.fname !== "" &&
      this.state.user.lname !== "" &&
      this.state.user.email !== "" &&
      this.state.user.gender !== "" &&
      this.state.user.designation !== "" &&
      this.state.user.address !== "" &&
      this.state.user.phoneno !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div>
        <form>
          <label>
            First Name
            <input
              onChange={this.setFormValues}
              type="text"
              name="fname"
              value={this.state.user.fname}
            />{" "}
          </label>
          <br />
          <label>
            Last Name
            <input
              type="text"
              name="lname"
              onChange={this.setFormValues}
              value={this.state.lname}
            />
          </label>
          <br />
          <label>
            Email
            <input
              type="text"
              name="email"
              onChange={this.setFormValues}
              value={this.state.email}
            />
          </label>
          <br />
          <label>
            Gender
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={this.setFormValues}
            />{" "}
            Male
            <input
              type="radio"
              onChange={this.setFormValues}
              name="gender"
              value="female"
            />{" "}
            Female
            <input
              type="radio"
              onChange={this.setFormValues}
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
              onChange={this.setFormValues}
              value={this.state.phoneno}
            />{" "}
          </label>
          <br />
          <label>
            Address
            <textarea
              type="text"
              name="address"
              onChange={this.setFormValues}
              value={this.state.address}
            />{" "}
          </label>
          <br />
          <label>
            Designation
            <input
              type="text"
              name="designation"
              onChange={this.setFormValues}
              value={this.state.designation}
            />{" "}
          </label>

          <br />

          {this.state.user.isFilled ? "" : <h5>all fields are manditory</h5>}
          <button onClick={this.submitForm}>Submit</button>
        </form>

        <DisplayUser />
      </div>
    );
  }
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
)(RegisterPage);
