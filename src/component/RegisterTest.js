import React from "react";
import UserAdd from "../redux/user/UserAdd";
import { connect } from "react-redux";
import "../css/styles.css";

class RegisterTest extends React.Component {
  constructor(props) {
    super(props);
    let user_local = JSON.parse(localStorage.getItem("editUser"));
    let user_l = null;
    if (user_local !== null) {
      user_l = user_local[0];
    } else {
      user_l = null;
    }
    // console.log("edit user=", user_l);
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
    //console.log("edit =", this.state.user.isEdit);
    if (this.state.user.isEdit) {
      // console.log("edit mode");
      if (this.formFilled()) {
        //    console.log("COMPLETED");
        let localUsers = [];
        localUsers = JSON.parse(localStorage.getItem("userList"));
        if (localUsers === null) {
          localUsers = [];
        }
        //  console.log("length", this.getArrayLengthOfLocalStorage());
        let u = localUsers.filter(items => items.s_no !== this.state.user.s_no);
        // console.log("u=", u);
        u.push(this.state.user);
        // console.log("u puse=", u);
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
      console.log("new is submit");
      if (this.formFilled()) {
        console.log("COMPLETED");
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
    console.log(this.text_validate(this.state.user.fname, "fname"));
    this.text_validate(this.state.user.fname, "fname");
    this.text_validate(this.state.user.lname, "lname");
    this.checkEmail(this.state.user.email, "email");
    this.addressValidation(this.state.user.address, "address");
    this.phonenumber(this.state.user.phoneno, "phoneno");
    if (
      this.text_validate(this.state.user.fname, "fname") === true &&
      this.text_validate(this.state.user.lname, "lname") === true &&
      this.checkEmail(this.state.user.email, "email") === true &&
      this.state.user.gender !== "" &&
      this.state.user.designation !== "" &&
      this.addressValidation(this.state.user.address, "address") === true &&
      this.phonenumber(this.state.user.phoneno, "phoneno") === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  text_validate = (values, id) => {
    var regex = /^[a-zA-Z ]{2,30}$/;
    //console.log(values, id);
    if (regex.test(values)) {
      document.getElementById(id).innerHTML = "";
      return true;
    } else {
      document.getElementById(id).innerHTML =
        "Enter Alphabets only min length 2";
      return false;
    }
  };

  checkEmail = (values, id) => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(values)) {
      document.getElementById(id).innerHTML = "";
      return true;
    } else {
      document.getElementById(id).innerHTML =
        "Enter Correct email format abc@xyz.fgh";
      return false;
    }
  };

  phonenumber = (values, id) => {
    var phoneno = /^[+]?[6-9]\d{9}$/;
    if (values.match(phoneno)) {
      document.getElementById(id).innerHTML = "";
      return true;
    } else {
      document.getElementById(id).innerHTML =
        "Enter valid phone no start with +/[6-9] ";
      return false;
    }
  };

  addressValidation = (values, id) => {
    var address = /^[a-zA-Z0-9\s,]*$/;

    console.log(values.length);
    if (values.match(address)) {
      document.getElementById(id).innerHTML = "";

      if (values.length < 141) {
        return true;
      } else {
        document.getElementById(id).innerHTML = "Max size 140";
        return false;
      }
    } else {
      document.getElementById(id).innerHTML = "Special Character not allowed";
      return false;
    }
  };

  render() {
    return (
      <div className="loginClass">
        <form>
          <label>
            First Name
            <input
              className="logininputClass"
              onKeyUp={() => this.text_validate(this.state.user.fname, "fname")}
              onChange={this.setFormValues}
              type="text"
              name="fname"
              value={this.state.user.fname}
            />{" "}
          </label>{" "}
          <span id="fname" />
          <br />
          <label>
            Last Name
            <input
              className="logininputClass"
              type="text"
              name="lname"
              onKeyUp={() => this.text_validate(this.state.user.lname, "lname")}
              onChange={this.setFormValues}
              value={this.state.user.lname}
            />
          </label>
          <span id="lname" />
          <br />
          <label>
            Email
            <input
              className="logininputClass"
              type="text"
              name="email"
              onKeyUp={() => this.checkEmail(this.state.user.email, "email")}
              onChange={this.setFormValues}
              value={this.state.user.email}
            />
          </label>
          <span id="email" />
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
              className="logininputClass"
              type="text"
              name="phoneno"
              onKeyUp={() =>
                this.phonenumber(this.state.user.phoneno, "phoneno")
              }
              onChange={this.setFormValues}
              value={this.state.user.phoneno}
            />{" "}
          </label>
          <span id="phoneno" />
          <br />
          <label>
            Address
            <input
              type="text"
              name="address"
              onKeyUp={() =>
                this.addressValidation(this.state.user.address, "address")
              }
              onChange={this.setFormValues}
              value={this.state.user.address}
            />{" "}
          </label>
          <span id="address" />
          <br />
          <label>
            Designation
            <select
              id="selectdes"
              name="designation"
              value={
                this.state.user.designation === ""
                  ? ""
                  : this.state.user.designation
              }
              onChange={this.setFormValues}
            >
              <option value="" />
              <option value="Associate">Associate</option>
              <option value="Sr. Associate">Sr. Associate</option>
              <option value="Manager">Manager</option>
              <option value="Sr. Manager">Sr. Manager</option>
            </select>{" "}
          </label>
          <br />
          {this.state.user.isFilled ? (
            ""
          ) : (
            <h5>All fields must Manadatory and Correct</h5>
          )}
          <button className="registerbtn" onClick={this.submitForm}>
            {this.state.user.isEdit ? "Update" : "Register"}
          </button>
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
)(RegisterTest);
