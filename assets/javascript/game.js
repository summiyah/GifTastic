
// create variable for giphy api
var APIKEY = "4xMrwTzx2U31XjltdWbxQStgV2Hh7vT1";

// create on.click function
$(document).on("click", "button", function () {
    var btnText = $(this).text();
    console.log(btnText);
    // instead of adding to query create object that adds all parameters? <---is that the right word? lol
    var queryString = $.param({
        q: btnText,
        limit: 10,
        rating: 'pg',
        api_key: APIKEY
    });

    var queryURL = "https://api.giphy.com/v1/gifs/search?" + queryString;

    // write the ajax to create function
    $.ajax({
        url: queryURL,
        method: 'GET'
        // call back function
    }).done(function(response) {
        console.log(response);
        // clear the images since I have new images
        $("#images").empty();
        // to use the data from giphy, I need to write code in the done callback
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].rating);
            // console log to find info on still and animated
            console.log(response.data[i].images.original_still.url);
            console.log(response.data[i].images.original.url);
            // create new image tag for the images to be called to the page


            var newImage = $("<img>");
            newImage.attr("src", response.data[i].images.original_still.url);
            newImage.attr("data-original-url", response.data[i].images.original.url);
            newImage.attr("data-still-url", response.data[i].images.original_still.url);
            // add image to page
            $("#images").append(newImage);
        }
    });
});


$(document).on("click", "img", function () {
    var img = $(this);
    var src = img.attr("src");
    // make if then statement to have function image
    // if this original url i.e. animated gif, swap for still image
    if (src === img.attr("data-original-url")) {
        img.attr("src", img.attr("data-still-url"));
    } else {
        // else statement: make it animate since it stopped
        img.attr("src", img.attr("data-original-url"));
    }
});

$("#addSearchBtn").on("click", function () {
    // user function to add button to list of buttons
    // create new button
    var newBtn = $("<button>");
    var searchText = $("#searchText").val();
    newBtn.text(searchText);
    // prepend to body
    $(".container").prepend(newBtn);
});

// need to make images have the same style i.e. height
// rating needs to be added to each image