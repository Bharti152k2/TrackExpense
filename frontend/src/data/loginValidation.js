export let validateFormData = (formValues) => {
  let error = {};

  //! Username Validations for login Data
  let mobRegex = /^[6-9][0-9]{9}$/;
  let emailRegex = /^[a-z0-9]+@[a-z]+.[a-z]+$/;

  if (formValues.username === "") {
    error.username = "Username is mandatory";
  } else if (
    !(
      emailRegex.test(formValues.username) || mobRegex.test(formValues.username)
    )
  ) {
    error.username = "Username not found";
  }

  //! Password Validations

  if (formValues.password === "") {
    error.password = "Password should not be empty";
  } else if (
    !(formValues.password.length > 7 && formValues.password.length < 11)
  ) {
    error.password = "Password length must be in between 8-10 characters";
  }

  return error;
};
