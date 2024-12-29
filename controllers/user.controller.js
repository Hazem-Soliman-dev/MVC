const userModel = require('../models/user.model');
const hashing = require('../utili/hashing');
const auth = require('../utili/auth');
exports.createUser = async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await hashing.hashPassword(password);
        req.body.password = hashedPassword
        const user = await userModel.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            const isMatch = await hashing.isMatch(password, user.password);
            if (isMatch) {
                /// return access token
              

                const token = auth.createAccessToken({userId:user._id,userType:user.userType});

                res.status(200).json({ accessToken: token })
            }
            else {
                res.status(400).json({ error: "this password not match" });
            }
        }
        else {
            res.status(400).json({ error: "this email not found" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find().populate('userType');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
