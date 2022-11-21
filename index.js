const express = require("express");
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const config = require('./config');
const swaggerConfig = {
    ...require("./doc/swagger.json"),
    host:       `${config.hostname}:${config.port}`,
    basePath:   `${config.baseUrl}`
};


const apiUrl = require("./api-url");
const controllers = require("./controllers");
const swaggerDocument = require("./doc/swagger.json");
const swaggerUi = require("swagger-ui-express");


const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get(apiUrl("version"), (req, res) => {

    res.send({
        version: config.version
    });
});


app.get(apiUrl("recipes"), controllers.recipes.getAll);
app.get(apiUrl("recipes/:name"), controllers.recipes.getByName);
app.get(apiUrl("recipes/:name/ingredients"), controllers.recipes.getIngredientsByRecipeName);
app.get(apiUrl("recipes/:name/ingredients/condiments"), controllers.recipes.getCondimentsByRecipeName);


app.listen(config.port, () => {
    console.log(`api is listening on port ${config.port}!`)
});