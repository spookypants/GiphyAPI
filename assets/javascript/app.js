$(document).ready(function() {
    //Array for new bridge crew
    var topics = [];
        // Interesting trick to make this all a function, then make click event with function later
        function displaySwearTrek() {
        var character = $(this).attr("enterprise-crew");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=JCPCf9T5YVBsQcPf2H6TMeI57cE2F2R0&limit=10";
        
        $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var defaultAnimatedSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    var characterImage = $("<img>");
                    var p = $("<p>").text("Rating: " + rating);
        
                    characterImage.attr("src", staticSrc);
                    characterImage.addClass("swearTime");
                    characterImage.attr("data-state", "still");
                    characterImage.attr("data-still", staticSrc);
                    characterImage.attr("data-animate", defaultAnimatedSrc);
                    gifDiv.prepend(p);
                    gifDiv.prepend(characterImage);
                    $("#gifs").prepend(gifDiv);
    
            }
        });
    }
    
        $("#addShow").on("click", function(event) {
            event.preventDefault();
            var newShow = $("#swearInput").val().trim();
            topics.push(newShow);
            $("#swearInput").val('');
            displayButtons();
          });
    

        //   Making new buttons -- how to get "swear trek" to auto add to every query? Must need to prepend to search input
        function displayButtons() {
        $("#newButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-danger">');
          a.attr("id", "show");
          a.attr("enterprise-crew", "swear trek" + topics[i]);
          a.text(topics[i]);
          $("#newButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      $(document).on("click", "#show", displaySwearTrek);
    
      $(document).on("click", ".swearTime", pausePlayGifs);
    
      //"data-animate" vs "data-still" -- why won't this work with the default buttons?
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });