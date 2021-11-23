const graphql = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userResolver, userCreateResolver } = require("./userResolver");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
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
                console.log("parent: ", parent.tokens);
                return parent.tokens.map((token) => token.token);
            },
        },
        role: { type: GraphQLString },
        rollNumber: { type: GraphQLString },
    }),
});

const AuthType = new GraphQLObjectType({
    name: "Auth",
    fields: () => ({
        token: { type: GraphQLString },
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
        AuthCheck: {
            type: AuthType,
            resolve(parent, args) {
                return { token: "asdasdasd" };
            },
        },
        auth: {
            type: AuthType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                return userResolver(args);
                // let tokenGenerated = { token: "testing" };
                // User.findOne({ username: args.username }).then((user) => {
                //     if (!user) {
                //         throw new Error("User not found");
                //     }
                //     bcrypt
                //         .compare(args.password, user.password)
                //         .then((result) => {
                //             if (result) {
                //                 user.generateAuthToken()
                //                     .then((token) => {
                //                         tokenGenerated = {
                //                             token,
                //                         };
                //                         console.log("token: ", tokenGenerated);
                //                         return tokenGenerated;
                //                     })
                //                     .catch((err) => {
                //                         console.log(err);
                //                     });
                //             } else {
                //                 throw new Error("Password not matched");
                //             }
                //         });
                //     console.log("user token: ", tokenGenerated);
                //     return tokenGenerated;
                // });
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
            },
            resolve(parent, args) {
                return userCreateResolver(args);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
