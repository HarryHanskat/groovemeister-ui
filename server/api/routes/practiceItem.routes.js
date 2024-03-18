/*
This is where all of the Practice Item routes live
Any request will have /api/practiceItem/ in it 
*/

module.exports = app => {
  const practiceItems = require("../controllers/practiceItem.controller.js");

  const router = require("express").Router();

  // Create new practiceItem
  router.post("/", practiceItems.create);

  // Retrieve all Practice Items
  router.get("/", practiceItems.findAll);

  // Retrieve a single Practice Item with id
  router.get("/:id", practiceItems.findOne);

  // Update a Practice Item with id
  router.put("/:id", practiceItems.update);

  // Delete a Practice Item with id
  router.delete("/:id", practiceItems.delete);

  // Delete all Practice Items
  router.delete("/", practiceItems.deleteAll);

  app.use('/api/practiceItems', router);
};