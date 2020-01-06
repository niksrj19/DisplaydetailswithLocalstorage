export const onSort = (dat, sortKey) => {
  /*
  assuming your data is something like
  [
    {accountname:'foo', negotiatedcontractvalue:'bar'},
    {accountname:'monkey', negotiatedcontractvalue:'spank'},
    {accountname:'chicken', negotiatedcontractvalue:'dance'},
  ]
  */
  //console.log("called onSOrt", sortKey);
  const data = dat;
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

  return data;
};
