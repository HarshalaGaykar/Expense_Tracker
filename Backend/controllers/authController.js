import User from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        let {
            username,
            email,
            password,
            fullName
        } = req.body;

        // Validation 1: Empty Space Checking
        username = username?.trim();
        fullName = fullName?.trim();
        email = email?.trim();

        if (!username || !fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required and cannot be empty spaces"
            });
        }

        // Validation 2: Email Format Checking
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        // Validation 3: Password Strength Rules (min 8 chars, needs number & letter)
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        if (password.length < 8 || !hasLetters || !hasNumbers) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and contain both letters and numbers"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Find user by email only
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


export {
    registerUser,
    loginUser
};