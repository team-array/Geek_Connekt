const graphql = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
const { userResolver, userCreateResolver } = require("./userResolver");
=======
const {
    userResolver,
    userCreateResolver,
    editUserResolver,
    editUserBioResolver,
    editUserLocationResolver,
} = require("./userResolver");

const { profilePicUploadResolver } = require("./fileuploadResolver");
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
<<<<<<< HEAD
=======
    GraphQLUpload,
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        tokens: {
            type: new GraphQLList(GraphQLString),
            resolve(parent, args) {
                // console.log("parent: ", parent.tokens);
                return parent.tokens.map((token) => token.token);
            },
        },
        role: { type: GraphQLString },
        rollNumber: { type: GraphQLString },
<<<<<<< HEAD
=======
        college: { type: GraphQLString },
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
    }),
});

const AuthType = new GraphQLObjectType({
    name: "Auth",
    fields: () => ({
        token: { type: GraphQLString },
<<<<<<< HEAD
=======
        result: { type: GraphQLString },
    }),
});

const FileType = new GraphQLObjectType({
    name: "File",
    fields: () => ({
        filename: { type: GraphQLString },
        mimetype: { type: GraphQLString },
        encoding: { type: GraphQLString },
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
    }),
});

const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            },
        },
<<<<<<< HEAD
        AuthCheck: {
            type: AuthType,
            resolve(parent, args) {
                return { token: "asdasdasd" };
            },
        },
=======
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
        auth: {
            type: AuthType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
<<<<<<< HEAD
=======
                college: { type: GraphQLString },
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
            },
            resolve(parent, args) {
                return userResolver(args);
            },
        },
    },
});

const Mutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: AuthType,
            args: {
                username: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
                email: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
                password: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
                role: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
                rollNumber: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
<<<<<<< HEAD
=======
                college: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
            },
            resolve(parent, args) {
                return userCreateResolver(args);
            },
        },
<<<<<<< HEAD
=======
        editUser: {
            type: AuthType,
            args: {
                token: { type: graphql.GraphQLString },
                username: { type: graphql.GraphQLString },
                email: { type: graphql.GraphQLString },
                birthDate: { type: graphql.GraphQLString },
            },
            resolve(parent, args) {
                return editUserResolver(args);
            },
        },
        editUserBio: {
            type: AuthType,
            args: {
                token: { type: graphql.GraphQLString },
                bio: { type: graphql.GraphQLString },
                secondarySchool: { type: graphql.GraphQLString },
                primarySchool: { type: graphql.GraphQLString },
            },
            resolve(parent, args) {
                return editUserBioResolver(args);
            },
        },
        editUserLocation: {
            type: AuthType,
            args: {
                token: { type: graphql.GraphQLString },
                location: { type: graphql.GraphQLString },
                hometown: { type: graphql.GraphQLString },
            },
            resolve(parent, args) {
                return editUserLocationResolver(args);
            },
        },
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
