import React from "react";
import UserAdd from "../redux/user/UserAdd";
import { connect } from "react-redux";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    let user_local = JSON.parse(localStorage.getItem("editUser"));
    let user_l = null;
    if (user_local !== null) {
      user_l = user_local[0];
    } else {
      user_l = null;
    }
    console.log("edit user=", user_l);
    this.state = {
      user: {
        s_no: user_l !== null ? user_l.s_no : 0,
        fname: user_l !== null ? user_l.fname : "",
        lname: user_l !== null ? user_l.lname : "",
        email: user_l !== null ? user_l.email : "",
        gender: user_l !== null ? user_l.gender : "",
        designation: user_l !== null ? user_l.designation : "",
        address: user_l !== null ? user_l.address : "",
        phoneno: user_l !== null ? user_l.phoneno : "",
        isFilled: true,
        isEdit: user_l !== null ? true : false
      },
      users: []
    };
  }

  setFormValues = e => {
    e.preventDefault();
    if (this.state.user.isEdit) {
      let user_local = JSON.parse(localStorage.getItem("editUser"));
      let user_l = null;
      if (user_local !== null) {
        user_l = user_local[0];
      } else {
        user_l = null;
      }
      let genSno =
        user_l !== null ? user_l.s_no : this.getMaxSnoFromLocalArray();
      this.setState({
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value,
          isFilled: true,
          s_no: genSno
        }
      });
    } else {
      let genSno = this.getMaxSnoFromLocalArray();
      this.setState({
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value,
          isFilled: true,
          s_no: genSno + 1
        }
      });
    }
  };

  getArrayLengthOfLocalStorage = () => {
    let a = JSON.parse(localStorage.getItem("userList"));
    if (a !== null) {
      return a.length;
    } else {
      return 0;
    }
  };

  getMaxSnoFromLocalArray = () => {
    let a = JSON.parse(localStorage.getItem("userList"));
    if (a !== null) {
      if (a.legnth === 0) {
        return 0;
      }
      var b = Math.max.apply(
        Math,
        a.map(function(o) {
          return o.s_no;
        })
      );
      // console.log("next=", b);
      return b;
    } else {
      return 0;
    }
  };

  submitForm = e => {
    e.preventDefault();
    console.log("edit =", this.state.user.isEdit);
    if (this.state.user.isEdit) {
      console.log("edit mode");
      if (this.formFilled()) {
        console.log("COMPLETED");
        let localUsers = [];
        localUsers = JSON.parse(localStorage.getItem("userList"));
        if (localUsers === null) {
          localUsers = [];
        }
        //  console.log("length", this.getArrayLengthOfLocalStorage());
        let u = localUsers.filter(items => items.s_no !== this.state.user.s_no);
        console.log("u=", u);
        u.push(this.state.user);
        console.log("u puse=", u);
        this.setState(
          {
            users: u
          },
          () => {
            // localStorage.setItem("userList", JSON.stringify(this.state.users));
            localStorage.setItem("userList", JSON.stringify(u));
            localStorage.removeItem("editUser");
            this.props.history.push("/display");
          }
        );

        // router.push("/display");
      } else {
        //  console.log("UNfilled");
        this.setState({
          user: { ...this.state.user, isFilled: false }
        });
      }
    } else {
      if (this.formFilled()) {
        // console.log("COMPLETED");
        let localUsers = [];
        localUsers = JSON.parse(localStorage.getItem("userList"));
        if (localUsers === null) {
          localUsers = [];
        }
        //  console.log("length", this.getArrayLengthOfLocalStorage());
        let u = [...this.state.users];

        u.push(this.state.user);
        localUsers.push(this.state.user);
        this.setState(
          {
            users: u
          },
          () => {
            // localStorage.setItem("userList", JSON.stringify(this.state.users));
            localStorage.setItem("userList", JSON.stringify(localUsers));
            this.props.history.push("/display");
          }
        );
        // router.push("/display");
      } else {
        //  console.log("UNfilled");
        this.setState({
          user: { ...this.state.user, isFilled: false }
        });
      }
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
              value={this.state.user.lname}
            />
          </label>
          <br />
          <label>
            Email
            <input
              type="text"
              name="email"
              onChange={this.setFormValues}
              value={this.state.user.email}
            />
          </label>
          <br />
          <label>
            Gender
            <input
              type="radio"
              name="gender"
              value="male"
              checked={this.state.user.gender === "male"}
              onChange={this.setFormValues}
            />{" "}
            Male
            <input
              type="radio"
              checked={this.state.user.gender === "female"}
              onChange={this.setFormValues}
              name="gender"
              value="female"
            />{" "}
            Female
            <input
              type="radio"
              checked={this.state.user.gender === "other"}
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
              value={this.state.user.phoneno}
            />{" "}
          </label>
          <br />
          <label>
            Address
            <textarea
              type="text"
              name="address"
              onChange={this.setFormValues}
              value={this.state.user.address}
            />{" "}
          </label>
          <br />
          <label>
            Designation
            <input
              type="text"
              name="designation"
              onChange={this.setFormValues}
              value={this.state.user.designation}
            />{" "}
          </label>

          <br />

          {this.state.user.isFilled ? "" : <h5>all fields are manditory</h5>}
          <button onClick={this.submitForm}>Submit</button>
        </form>
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
