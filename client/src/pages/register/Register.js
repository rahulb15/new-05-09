import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import FormPropsTextFields from '../UI/Form.js';
import Box from "@mui/material/Box";
import axios from "axios";
import "./Register.css";

function Register() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post("http://localhost:5000/api/user/register", user)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log("HELOOO");
        if (err.response.status === 401) {
          alert("Email already exists");
        }
        console.log(err);
      });
  };

  return (
    <div className="register">
      <Button
        className="button"
        type="submit"
        variant="contained"
        onClick={handleClickOpen}
        style={{ padding: "7px 20px", marginLeft: "10px" }}
      >
        Create User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-password-input"
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
              />
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Date of Birth"
                  variant="outlined"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleChange}
                />
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                  >
                    <FormControlLabel
                      value="female"
                      onChange={handleChange}
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      onChange={handleChange}
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      onChange={handleChange}
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Register;
