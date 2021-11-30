require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const fileUpload = require("express-fileupload");
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");     

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/"}));

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.use(routes);

require("./database/connect");

const port = process.env.PORT || 8000;
app.listen(port, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log(
            `CONNECTION TO EXPRESS ESTABLISHED at port: ${port}`
        );
    }
});
