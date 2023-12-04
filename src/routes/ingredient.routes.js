const { Router } = require("express");
const IngredientsControllers = require("../controllers/IngredientsController");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const routes = Router();
const ingredientsControllers = new IngredientsControllers();

routes
    .post("/", ensureThatIsAdmin, ingredientsControllers.create)
    .get("/", ingredientsControllers.index);

module.exports = routes;