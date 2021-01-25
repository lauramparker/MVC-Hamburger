// Make sure we wait to attach our handlers until the DOM is fully loaded.


//function to move a burger to devoured 
//change-status is contained in partial
$(function() { 
    $(".change-status").on("click", function(event) {
      var id = $(this).data("id");
      var name = $(this).data("name");
      var newDevour = $(this).data("newdevour");
  
      var devourBurger = {
      //  id: id,
      //  name: name,
        devour: newDevour
      };
  
      // Send the PUT request to update the devoured state.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devourBurger
      }).then(
        function() {
          console.log("yummy!")
          // Reload the page to get the updated list
          location.reload();
        });
    });


    // Adds a new burger to the list  // preventDefault on a SUBMIT event
    $(".createNEW-form").on("submit", function(event) {
      
    event.preventDefault();
  
      var newBurger = {
        name: $("#hambrg").val().trim(),
        devour: false
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        });

    });

});



