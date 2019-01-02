function displayGifs() {
    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero +
        "&api_key=DOIPJ1030YI69wiQkcqGIvkzMaK4C0Jh&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(response);
        $(".gifs").empty();

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== 'r') {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var heroImage = $("<img>");
                heroImage.attr("src", results[i].images.fixed_height_still.url);
                heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                heroImage.attr("data-animate", results[i].images.fixed_height.url);
                heroImage.attr("data-state", "still");
                heroImage.addClass("image");
                gifDiv.append(heroImage, p);
                p.addClass("rating");
               
                $(".gifs").prepend(gifDiv);
            }
        }
    })
}

$(document).on("click", ".image", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

var topics = ["Spiderman", "Batman", "Superman", "Wonder Woman", "Iron Man", "The Hulk", "Captain America", "Black Panther", "Thor", "Deadpool"];


function renderButtons() {

    $("#buttons-view").empty();


    for (var i = 0; i < topics.length; i++) {


        var a = $("<button>", "<br>");

        a.addClass("hero-btn", "btn btn-warning");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);

        $("#buttons-view").append(a);
    }
}


$("#add-hero").on("click", function (event) {
    event.preventDefault();

    var hero = $("#hero-input").val().trim();


    topics.push(hero);


    renderButtons();

    
});


$(document).on("click", ".hero-btn", displayGifs);


renderButtons();