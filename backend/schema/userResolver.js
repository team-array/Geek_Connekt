const User = require("../models/user");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userResolver = async (args) => {
    const user = await User.findOne({
        username: args.username,
        college: args.college,
        password:args.password,
    });
    console.log(user);
    if (user) {
        const passMatch = true;
        if (passMatch) {
            // const token = await user.authTokenGeneration();
            // console.log("User LoggedIn with Token: ", token);
            const userToken = await user.generateAuthToken();
            // console.log("userToken: ", userToken);
            // await user.save();
            return {
                token: userToken,
                result: "Success",
            };
        } else {
            return {
                token: "",
                result: "Invalid Credentials!",
            };
        }
    } else {
        return { token: "", result: "User dosn't Exist!" };
    }
};

const userCreateResolver = async (args) => {
    try {
        const dupUser = await User.findOne({ username: args.username });
        // console.log("dupUser: ", dupUser);
        if (dupUser) {
            return { token: "", result: "UserName already taken!" };
        }
        const user = new User({
            username: args.username,
            password: args.password,
            email: args.email,
            role: args.role,
            rollNumber: args.rollNumber,
            college: args.college,
        });
        // user.password = bcrypt.hashSync(user.password, 10);
        const token = await user.generateAuthToken();
        // console.log("Token: ", token);
        return { token: token, result: "Success" };
    } catch (error) {
        console.log(error);
        return { token: "", result: "Error" };
    }
};

const userAuthCheck = async (args) => {
    try {
        const { username } = jwt.verify(args.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            return {
                id: user.id,
                username: user.username,
                result: "Success",
            };
        }
        return {
            id: "",
            username: "",
            result: "User doesn't Exist!",
        };
    } catch (error) {
        console.log(error);
        return {
            id: "",
            username: "",
            result: "Error",
        };
    }
};

const editUserResolver = async (args) => {
    try {
        const { username } = jwt.verify(args.token, process.env.JWT_SCRECT);
        const user = await User.findOne({ username: username });
        if (user) {
            // console.log("editUserResolver: ", username);
            const dupUser = await User.findOne({ username: args.username });
            if (user.username === args.username || dupUser === null) {
                // console.log(dupUser);
                // console.log("User not found");
                user.username = args.username;
                user.email = args.email;
                const token = jwt.sign(
                    {
                        username: user.username.toString(),
                        email: user.email.toString(),
                        role: user.role.toString(),
                        rollNumber: user.rollNumber.toString(),
                    },
                    process.env.JWT_SCRECT
                );
                user.tokens = [];
                user.tokens.push({ token: token.toString() });
                await user.save();
                return { token: token, result: "Success" };
            } else {
                return {
                    token: args.token,
                    result: "Username Already taken",
                };
            }
        }
        return {
            token: "",
            result: "User doesn't Exist!",
        };
    } catch (error) {
        console.log(error);
        return {
            token: "",
            result: "Error",
        };
    }
};

const editUserBioResolver = async (args) => {
    try {
        const { username } = jwt.verify(args.token, process.env.JWT_SCRECT);
        const user = await User.findOne({ username: username });
        if (user) {
            user.bio = args.bio;
            user.secondarySchool = args.secondarySchool;
            user.primarySchool = args.primarySchool;
            await user.save();
            return {
                token: args.token,
                result: "Success",
            };
        }
        return {
            token: "",
            result: "User doesn't Exist!",
        };
    } catch (error) {
        console.log(error);
        return {
            token: "",
            result: "Error",
        };
    }
};

const editUserLocationResolver = async (args) => {
    try {
        const { username } = jwt.verify(args.token, process.env.JWT_SCRECT);
        const user = await User.findOne({ username: username });
        if (user) {
            user.location = args.location;
            user.homeTown = args.homeTown;
            await user.save();
            return {
                token: args.token,
                result: "Success",
            };
        }
        return {
            token: "",
            result: "User doesn't Exist!",
        };
    } catch (error) {
        console.log(error);
        return {
            token: "",
            result: "Error",
        };
    }
};

module.exports = {
    userResolver,
    userCreateResolver,
    editUserResolver,
    editUserBioResolver,
    editUserLocationResolver,
    userAuthCheck,
};
