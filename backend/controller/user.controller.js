const RegisteredUser = require("../model/registerUser.model");
const LoggedinUser = require("../model/loginUser.model");
const { default: mongoose } = require("mongoose");

//^ SIGNUP API : TO SEND THE SIGNUP DATA TO BACKEND

let signUp = async (req, res, next) => {
  try {
    let {
      firstname,
      lastname,
      email,
      mobile,
      password,
      confirmPassword,
      gender,
    } = req.body;

    //!  validating before send the data

    //* for empty fields
    if (
      !firstname ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return res.json({ error: false, message: "All fields are mandatory" });
    }

    //* for filled fields
    if (firstname && email && mobile && password && confirmPassword && gender) {
      //^ checking for existing users
      let existingUser = await RegisteredUser.findOne({
        $or: [{ email }, { mobile }],
      });

      if (existingUser) {
        return res.json({ error: false, message: "User already exists" });
      }

      //^ validation for new user
      let nameReg = /^[a-zA-Z]+$/g;
      let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let mobReg = /^[6-9][0-9]{9}$/;

      if (!nameReg.test(firstname)) {
        return res
          .status(400)
          .json({ message: "Name should contain only alphabets" });
      }
      //  if (lastname || !nameReg.test(lastname)) {
      //   return res
      //     .status(400)
      //     .json({ message: "djjdjcName should contain only alphabets" });
      // } else
      else if (!mobReg.test(mobile)) {
        return res.status(201).json({ message: "Enter a valid mobile number" });
      } else if (!emailReg.test(email)) {
        return res.status(201).json({ message: "Enter a valid email number" });
      } else if (password !== confirmPassword) {
        return res
          .status(201)
          .json({ message: "password and confirm password should match" });
      } else {
        let signupUser = await RegisteredUser.create({
          firstname,
          lastname,
          email,
          mobile,
          password: confirmPassword,
          gender,
        });

        return res.status(201).json({
          error: false,
          message: "Registered Succesfully",
          data: signupUser,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

//^ LOGIN API : TO CHECK THE LOGIN DATA FROM BACKEND

let login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    //!  validating before send the data

    //* for empty fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: false, message: "All fields are mandatory" });
    }

    //* for filled fields
    if (username && password) {
      //^ for entered data

      //* validating for username is email or mobile
      let isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        username
      );
      let isMobile = /^[6-9][0-9]{9}$/.test(username);

      if (!isEmail && !isMobile) {
        return res
          .status(400)
          .json({ error: true, message: "Invalid username" });
      }

      //* checking for existing users

      let existingUser;
      if (isEmail) {
        existingUser = await RegisteredUser.findOne({ email: username });
      } else if (isMobile) {
        existingUser = await RegisteredUser.findOne({ mobile: username });
      }
      console.log(existingUser);

      //* validation for user login
      if (existingUser && existingUser.password === password) {
        let loginUser = await LoggedinUser.create({
          username,
          password,
        });
        res.status(201).json({
          error: false,
          message: "Loggedin Successfully",
          data: loginUser,
        });
      } else {
        return res.status(400).json({ error: true, message: "User not found" });
      }
    }
  } catch (error) {
    next(error);
  }
};

//^ USERDATA API : TO GET THE USERDATA DATA FROM BACKEND
let userData = async (req, res, next) => {
  try {
    let users = await RegisteredUser.find();

    res.status(200).json({
      error: false,
      message: "UserData fetched succesfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// let logout = async (req, res, next) => {
//   try {
//     let { userId } = req.params;
//     console.log(userId);

//     await LoggedinUser.findByIdAndDelete(userId);

//     res.status(200).send({ message: "User logged out and data deleted" });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  signUp,
  login,
  userData,
  // logout,
};
