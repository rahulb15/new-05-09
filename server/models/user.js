import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  local: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: false,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    confirmPassword: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "offline",
    },
    token: {
      type: String,
    },
  },
  google: {
    id: String,
    token: String,
    email: String,
    firstName: String,
    lastName: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    firstName: String,
    gender: String,
    lastName: String,
    date: Date,
    image: String,
  },
  github: {
    id: String,
    token: String,
    username: String,
    image: String,
  },
  // uid: {
  //     type: String,
  //     unique: true,
  // },
  // firstName: {
  //     type: String,
  // },
  // lastName: {
  //     type: String,
  // },
  // email: {
  //     type: String,
  //     unique: false,
  //     trim: true,
  // },
  // password: {
  //     type: String,
  //     trim: true,
  // },
  // confirmPassword: {
  //     type: String,
  //     trim: true,
  // },
  // dateOfBirth: {
  //     type: Date,
  // },
  // gender: {
  //     type: String,
  // },
  // date: {
  //     type: Date,
  //     default: Date.now,
  // },
  // status: {
  //     type: String,
  //     default: "offline",
  // },
  // token: {
  //     type: String,
  // },
  // image: {
  //     type: String,
  // },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
