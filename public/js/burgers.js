// Make sure we wait to attach our handlers until the DOM is fully loaded.

//function to move a burger to devoured 
$(function () {
  $(".change-status").on("click", function (event) {

    var id = $(this).data("id");
    var burger_name = $(this).data("burger_name");
    var newDevour = true; //$(this).data("newdevour");

    var devourBurger = {
      id: id,
      burger_name: burger_name,
      devoured: newDevour
    };
    console.log(devourBurger);


    // Send the PUT request to update the devoured state.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devourBurger
    }).then(
      function () {
        console.log("yummy!" + id);
        // Reload the page to get the updated list
        location.reload();
      });
  });


  // Adds a new burger to the list  // preventDefault on a SUBMIT event
  $(".createNEW-form").on("submit", function (event) {

    event.preventDefault();

    var newBurger = {
      burger_name: $("#hambrg").val().trim(),
      devoured: false
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });

  });

});



