import React from "react";
import UserAdd from "../redux/user/UserAdd";
import { connect } from "react-redux";
import { onSort } from "../Validation/sort";

class DisplayUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: JSON.parse(localStorage.getItem("userList")),
      isNull: true
    };
    console.log("ONSORT=", onSort);
  }
  deleteItem = id => {
    console.log("id=", id);

    let newUsers = this.state.users.filter(item => item.s_no !== id);
    this.setState({ users: newUsers }, () =>
      localStorage.setItem("userList", JSON.stringify(this.state.users))
    );

    console.log(newUsers);
  };

  editItem = id => {
    let newUsers = this.state.users.filter(item => item.s_no === id);
    localStorage.setItem("editUser", JSON.stringify(newUsers));
    this.props.history.push("/");
  };

  /* onSort(event, sortKey) {
    
    const data = this.state.users;
    //  if (sortKey === "s_no") {
    // console.log(data);
    //  data.sort((a, b) => (a.s_no >= b.s_no ? 1 : -1));
    // }
    if (sortKey === "fname") {
      data.sort((a, b) =>
        a.fname.toUpperCase() >= b.fname.toUpperCase() ? 1 : -1
      );
      console.log(data);
    }
    if (sortKey === "lname") {
      data.sort((a, b) =>
        a.lname.toUpperCase() >= b.lname.toUpperCase() ? 1 : -1
      );
      console.log(data);
    }
    if (sortKey === "email") {
      data.sort((a, b) =>
        a.email.toUpperCase() >= b.email.toUpperCase() ? 1 : -1
      );
      console.log(data);
    }
    if (sortKey === "gender") {
      data.sort((a, b) =>
        a.gender.toUpperCase() >= b.gender.toUpperCase() ? 1 : -1
      );
      console.log(data);
    }
    if (sortKey === "phno") {
      data.sort((a, b) => (a.phoneno >= b.phoneno ? 1 : -1));
      console.log(data);
    }
    if (sortKey === "address") {
      data.sort((a, b) =>
        a.address.toUpperCase() >= b.address.toUpperCase() ? 1 : -1
      );
      console.log(data);
    }
    if (sortKey === "designation") {
      data.sort((a, b) =>
        a.designation.toUpperCase() >= b.designation.toUpperCase() ? 1 : -1
      );
      console.log(data);
    }

    this.setState({ users: data });
  }  */

  onSortDis = (e, items) => {
    const data = this.state.users;

    let sortData = onSort(data, items);

    this.setState({ users: sortData });
  };
  getUserData = () => {
    let userdata = "";
    console.log(this.state.users);
    if (this.state.users !== null) {
      userdata = this.state.users.map((items, id) => (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{items.fname}</td>
          <td>{items.lname}</td>
          <td>{items.email}</td>
          <td>{items.gender}</td>
          <td>{items.phoneno}</td>
          <td>{items.address}</td>
          <td>{items.designation}</td>

          <td>
            <button
              className="deletebtn"
              onClick={() => this.deleteItem(items.s_no)}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              className="editbtn"
              onClick={() => this.editItem(items.s_no)}
            >
              Edit
            </button>
          </td>
        </tr>
      ));
      return userdata;
    }
  };

  render() {
    return (
      <div>
        <table border="1" id="customers">
          <tbody>
            <tr>
              <th onClick={e => this.onSortDis(e, "s_no")}>No.</th>
              <th onClick={e => this.onSortDis(e, "fname")}> First Name</th>
              <th onClick={e => this.onSortDis(e, "lname")}>Last Name</th>
              <th onClick={e => this.onSortDis(e, "email")}>Email</th>
              <th onClick={e => this.onSortDis(e, "gender")}>Gender</th>
              <th onClick={e => this.onSortDis(e, "phno")}> Phone No</th>
              <th onClick={e => this.onSortDis(e, "address")}>Address</th>
              <th onClick={e => this.onSortDis(e, "designation")}>
                Designation
              </th>
            </tr>
            {this.getUserData()}
          </tbody>
        </table>
        <button
          className="registerbtn"
          onClick={() => this.props.history.push("/")}
        >
          Add More User
        </button>
      </div>
    );
  }
}
export default DisplayUser;
