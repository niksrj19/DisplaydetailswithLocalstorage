function text_validate(value) {
  var regex = /^[a-zA-Z ]{2,30}$/;

  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
}
