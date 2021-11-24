const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userResolver = async (args) => {
    const user = await User.findOne({ username: args.username });
    console.log(user);
    if (user) {
        const passMatch = await bcrypt.compare(args.password, user.password);
        console.log(passMatch);
        if (passMatch) {
            // const token = await user.authTokenGeneration();
            // console.log("User LoggedIn with Token: ", token);
            const userToken = jwt.sign(
                {
                    username: user.username.toString(),
                    email: user.email.toString(),
                    role: user.role.toString(),
                    rollNumber: user.rollNumber.toString(),
                },
                process.env.JWT_SCRECT
            );
            user.tokens.push({ token: userToken.toString() });
            // console.log("userToken: ", userToken);
            await user.save();
            return {
                token: userToken,
            };
        } else {
            return {
                token: "Error",
            };
        }
    } else {
        return { token: "Error" };
    }
};

const userCreateResolver = async (args) => {
    const user = new User({
        username: args.username,
        password: args.password,
        email: args.email,
        role: args.role,
        rollNumber: args.rollNumber,
    });
    user.password = bcrypt.hashSync(user.password, 10);
    const token = await user.generateAuthToken();
    // console.log("Token: ", token);
    return { token: token };
};

module.exports = {
    userResolver,
    userCreateResolver,
};
