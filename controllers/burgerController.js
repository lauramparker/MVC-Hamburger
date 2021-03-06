//Dependencies
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");


//Routes

// GETS all the data from burgers object, passes into the view (index.handlebars)
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {burgers: data};
 //   console.log(hbsObject); //debugging
    res.render("index", hbsObject);
  });
});



// ADDS a new burger to the list, default to 'devour' === false

router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name"], [req.body.burger_name], function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
  });



// UPDATES a burger once it's been devoured, changes 'devour' === true
router.put("/api/burgers/:id", function(req, res) {
  
  var condition = "id = " + req.params.id;

  console.log(condition);

  burger.update(
    {devoured: true},  //should be devoured: req.body.devour
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

//delete burger based on id
router.delete("/api/burgers/:id", function(req, res) {
  burger.delete(["burger_name"], [req.body.burger_name], function(result) {
    // Send back the ID of the new burger
    res.json({ result });
  });
});

// Export routes for server.js to use.
module.exports = router;
