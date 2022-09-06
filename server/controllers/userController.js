import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";


class UserController {

    static userRegister = async (req, res) => {
        const { firstName, lastName, email, password, confirmPassword, dateOfBirth, gender } = req.body;
        const user = await UserModel.findOne({ 'local.email': email });
        if (user) {
            res.status(401).json({ message: "User already exists" });
        }
        else {
            if (firstName && lastName && email && password && confirmPassword && dateOfBirth && gender){
                if (password === confirmPassword) {
                    try{
                        const newUser = new UserModel({
                            'local.firstName' : firstName,
                            'locaal.lastName' : lastName,
                            'local.email' : email,
                            'local.password' : password,
                            'local.confirmPassword' : confirmPassword,
                            'local.dateOfBirth' : dateOfBirth,
                            'local.gender' : gender,
                            'local.status' : "offline",
                        });
                        await newUser.save();
                        res.status(201).json({ message: "User created successfully" });
                    }
                    catch (error) {
                        console.log(error);
                        res.status(400).json({ message: error.message });
                    }
                }
                else {
                    res.status(400).json({ message: "Password does not match" });
                }
            }
            else {
                res.status(400).json({ message: "Please fill all the fields" });
            }
        }
    }

    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        if(email && password){
            try {
                const user = await UserModel.findOne({ email: email });
                if (!user) {
                    res.status(400).json({ message: "User does not exist" });
                }
                else {
                    if (user.password === password && user.email === email) {
                        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
                        res.status(200).json({ message: "User logged in successfully", token: token });
                        await UserModel.updateMany({ email: email }, { status: "online", token: token });
                    }
                    else {
                        res.status(400).json({ message: "Invalid credentials" });
                    }
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        else {
            res.status(400).json({ message: "Please fill all the fields" });
        }
    }

    static userLogout = async (req, res) => {
        console.log(req.session.id);
        req.logout()
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect("http://localhost:3000/");
        });
    }



    static userUpdate = async (req, res) => {
        const { firstName, lastName, email, password, confirmPassword, dateOfBirth, gender } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            if (firstName || lastName || email || password || confirmPassword){
                if (password === confirmPassword) {
                    try{
                        await UserModel.updateOne({ email: email }, { firstName: firstName, lastName: lastName, email: email, password: password, confirmPassword: confirmPassword, dateOfBirth: dateOfBirth });
                        res.status(200).json({ message: "User updated successfully" });
                    }
                    catch (error) {
                        res.status(400).json({ message: error.message });
                    }
                }
                else {
                    res.status(400).json({ message: "Password does not match" });
                }
            }
            else {
                res.status(400).json({ message: "Please fill all the fields" });
            }
        }
        else {
            res.status(400).json({ message: "User does not exist" });
        }
    }

    static userDelete = async (req, res) => {
        const { _id } = req.body;
        const user = await UserModel.findOne({ _id: _id });
        if (user) {
            try{
                await UserModel.deleteOne({ _id: _id });
                res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        else {
            res.status(400).json({ message: "User does not exist" });
        }
    }



    static userGet = async (req, res) => {
        const { _id } = req.body;
        const user = await UserModel.findOne({ _id: _id });
        if (user) {
            res.status(200).json({ message: "User found successfully", user: user });
        }
        else {
            res.status(400).json({ message: "User does not exist" });
        }
    }

    static userGetAll = async (req, res) => {
        const users = await UserModel.find();
        if (users) {
            res.status(200).json({ message: "Users found successfully", users: users });
        }
        else {
            res.status(400).json({ message: "No users found" });
        }
    }

}

export default UserController;