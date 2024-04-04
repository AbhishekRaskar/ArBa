const express = require('express');
const bcrypt = require('bcrypt');
const { userModel } = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

// Signup
userRouter.post('/signup', async (req, res) => {
    const { fullName, userName, email, password, age } = req.body;

    try {
        // Validate required fields
        if (!fullName || !userName || !email || !password || !age) {
            return res.status(400).json({ msg: 'Please provide all required fields.' });
        }

        const userByEmail = await userModel.findOne({ email });
        if (userByEmail) {
            return res.status(400).json({ msg: 'Email is already registered.' });
        }

        const userByUserName = await userModel.findOne({ userName });
        if (userByUserName) {
            return res.status(400).json({ msg: 'Username is already taken.' });
        }

        // Hash password
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            try {
                const newUser = new userModel({ ...req.body, password: hash });
                await newUser.save();
                res.status(200).json({ msg: 'User has been registered successfully.' });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not Exist" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(400).json({ msg: "Wrong Credentials" });
            }

            const token = jwt.sign({ userName: user.fullName, userID: user._id }, process.env.secret);

            // Send token along with user details
            res.status(200).json({
                msg: "Login Successful!",
                token: token,
                user: user
            });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Update user's profile
userRouter.put("/update/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        const { fullName, avatar, currentPassword, newPassword } = req.body;

        if (fullName) {
            // Update fullName
            user.fullName = fullName;
        }

        if (avatar) {
            // Update avatar
            user.avatar = avatar;
        }

        if (currentPassword && newPassword) {
            // Check password matches
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Current password is incorrect." });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        // Return appropriate response based on the updated field
        if (fullName) {
            res.status(200).json({ msg: "FullName updated successfully.", user });
        } else if (avatar) {
            res.status(200).json({ msg: "Avatar updated successfully.", user });
        } else {
            res.status(200).json({ msg: "Password updated successfully." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = {
    userRouter
};
