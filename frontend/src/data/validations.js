export let validateFormData = (formValues) => {
  let error = {};

  //! Name Validations
  let nameRegex = /^[a-zA-Z]+$/g;

  //* for firstname
  if (formValues.firstname === "") {
    error.firstname = "Firstname is mandatory";
  } else if (!nameRegex.test(formValues.firstname)) {
    error.firstname = "Firstname should contain only characters";
  } else if (formValues.firstname.length < 3) {
    error.firstname = "Firstname should contain atleast 3 characters";
  }

  //* for lastname
  if (formValues.lastname) {
    if (!nameRegex.test(formValues.lastname)) {
      error.lastname = "Lastname should contain only characters";
    } else if (formValues.lastname.length < 4) {
      error.lastname = "Lastname should contain atleast 4 characters";
    }
  }

  //! Contact Validations
  let mobRegex = /^[6-9][0-9]{9}$/;

  if (formValues.mobile === "") {
    error.mobile = "Mobile number is mandatory";
  } else if (!mobRegex.test(formValues.mobile)) {
    error.mobile = "Invalid mobile number";
  }
  //! Email Validations
  let emailRegex = /^[a-z0-9]+@[a-z]+.[a-z]+$/;

  if (formValues.email === "") {
    error.email = "Email is mandatory";
  } else if (!emailRegex.test(formValues.email)) {
    error.email = "Email doesn't exist";
  }

  //! Password Validations
  //* for password
  if (formValues.password === "") {
    error.password = "Password should not be empty";
  } else if (
    !(formValues.password.length > 7 && formValues.password.length < 11)
  ) {
    error.password = "Password length must be in between 8-10 characters";
  }

  //* for confirm password
  if (formValues.confirmPassword === "") {
    error.confirmPassword = "Confirm password should not be empty";
  } else if (
    !(formValues.password.length === formValues.confirmPassword.length)
  ) {
    error.confirmPassword = "Password and confirm password should match";
  }
  //! Gender validation
  if (formValues.gender === "") {
    error.gender = "Select gender";
  }

  return error;
};
