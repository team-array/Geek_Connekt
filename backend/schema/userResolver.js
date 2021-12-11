const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserData = async (args) => {
    try {
        const { username } = jwt.verify(args.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            return {
                token: args.token,
                result: "Success",
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                rollNumber: user.rollNumber,
                college: user.college,
                bio: user.bio,
                secondarySchool: user.secondarySchool,
                primarySchool: user.primarySchool,
                location: user.location,
                homeTown: user.homeTown,
                profilePic: user.profilePic,
                backgroundPic: user.backgroundPic,
                newNotifications: user.newNotifications,
                website: user.website,
                birthDate: user.birthDate,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
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

const getOtherUserData = async (args) => {
    try {
        const user = await User.findById(args.id);
        // console.log("getOtherUserData: ", args);
        // console.log(user.username);
        if (user) {
            return {
                token: args.token,
                result: "Success",
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                rollNumber: user.rollNumber,
                college: user.college,
                bio: user.bio,
                secondarySchool: user.secondarySchool,
                primarySchool: user.primarySchool,
                location: user.location,
                homeTown: user.homeTown,
                profilePic: user.profilePic,
                backgroundPic: user.backgroundPic,
                newNotifications: user.newNotifications,
                website: user.website,
                birthDate: user.birthDate,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
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

const userResolver = async (args) => {
    const user = await User.findOne({
        username: args.username,
        college: args.college,
    });
    console.log(user);
    if (user) {
        console.log(args.password);
        const passMatch = await bcrypt.compare(args.password, user.password);
        console.log(passMatch);
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
            phoneNumber: args.phoneNumber,
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
        console.log(args);
        const { username } = jwt.verify(args.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            return {
                id: user.id,
                username: user.username,
                result: "Success",
                role: user.role,
                email: user.email,
                rollNumber: user.rollNumber,
                college: user.college,
                bio: user.bio,
                secondarySchool: user.secondarySchool,
                primarySchool: user.primarySchool,
                location: user.location,
                homeTown: user.homeTown,
                profilePic: user.profilePic,
                backgroundPic: user.backgroundPic,
                newNotifications: user.newNotifications,
                website: user.website,
                birthDate: user.birthDate,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
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
        console.log(args);
        const { username } = jwt.verify(args.token, process.env.JWT_SECRET);
        console.log("editUserResolver: ", args);
        let set = {};
        if (args.username !== "") {
            set.fullName = args.username;
        }
        if (args.email !== "") {
            set.email = args.email;
        }
        if (args.website !== "") {
            set.website = args.website;
        }
        if (args.birthDate !== "") {
            set.birthDate = args.birthDate;
        }
        // console.log("editUserResolver: ", username);
        const result = await User.findOneAndUpdate(
            {
                username,
            },
            {
                ...set,
            }
        );
        console.log("result: ", result);
        return {
            token: args.token,
            result: "Updated Successfully!",
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
    getUserData,
    getOtherUserData,
};
