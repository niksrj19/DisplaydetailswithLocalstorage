import React from "react";
import UserAdd from "../redux/user/UserAdd";
import { connect } from "react-redux";

class UseDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: JSON.parse(localStorage.getItem("userList"))
    };
    console.log(this.state.users);
  }

  getUserData = () => {
    let userdata = "";

    userdata = this.state.users.map((items, id) => (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{items.fname}</td>
        <td>{items.lname}</td>
        <td>{items.email}</td>
        <td>{items.gender}</td>
        <td>{items.designation}</td>
        <td>{items.address}</td>
        <td>{items.phoneno}</td>
        <td>
          <button onClick={({ id }) => this.clickedItem(id)}>Delete</button>
        </td>
      </tr>
    ));
    return userdata;
  };

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone No</th>
              <th>Address</th>
              <th>Designation</th>
            </tr>
            <td>{this.props.user.s_no}</td>
            <td>{this.props.user.fname}</td>
            <td>{this.props.user.lname}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.gender}</td>
            <td>{this.props.user.designation}</td>
            <td>{this.props.user.address}</td>
            <td>{this.props.user.phoneno}</td>
            <td>
              <button onClick={({ id }) => this.clickedItem(id)}>Delete</button>
            </td>
          </tbody>
        </table>
      </div>
    );
  }
}
export default UseDetails;
