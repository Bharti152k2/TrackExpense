export let validateFormData = (formValues) => {
  let error = {};

  //! Category Validations
  let charRegex = /^[a-zA-Z]+$/g;
  if (formValues.category === "") {
    error.category = "Enter a category";
  } else if (formValues.category.length < 4) {
    error.category = "Category should contain atleast 4 characters";
  } else if (!charRegex.test(formValues.category)) {
    error.category = "Category should contain only characters";
  }

  //! Amount Validationss
  let amountRegex = /^[\d.,]+|[\d.,]+$/;

  if (formValues.amount === "") {
    error.amount = "Amount should not be empty";
  } else if (!amountRegex.test(formValues.amount)) {
    error.amount = "Enter a valid amount";
  }

  //! Date validation
  if (formValues.date === "") {
    error.date = "Date is mandatory";
  }

  //! Description Validations

  if (formValues.description === "") {
    error.description = "Description should be filled";
  }

  return error;
};
