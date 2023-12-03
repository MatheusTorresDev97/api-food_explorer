const { Router } = require("express");
const MealsControllers = require("../controllers/MealsControllers");

const routes = Router();
const mealsControllers = new MealsControllers();

routes
.post("/", ensureThatIsAdmin, mealsControllers.create)
  .get("/", mealsControllers.index)
  .get("/:id", mealsControllers.show)
  .put("/:id", mealsControllers.update)
  .put("/:id", ensureThatIsAdmin, mealsControllers.update)
  .delete("/:id", ensureThatIsAdmin, mealsControllers.delete);

module.exports = routes;
