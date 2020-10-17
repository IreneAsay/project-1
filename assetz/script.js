$(document).ready(function () {
  console.log("This is a test");
  // This function presents a waiting message and retrieves the requested website and places it in an iframe.
  function searchArchive(searchInputUrl, searchInputYear) {
    var queryURL =
      "https://cors-anywhere.herokuapp.com/http://archive.org/wayback/available?url=" +
      searchInputUrl +
      "&timestamp=" +
      searchInputYear +
      "0601";

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        // Printing the entire object to console
        console.log(response);
        $("#insertTest").append(`
          <p>Please Wait: Currently Loading the webpage for you</p>
        `);
        var gifOne = $("<img>").attr("src", "./assets/image/giphytrailer.gif");
        var gifTwo = $("<img>").attr("src", "./assets/image/giphytakeoff.webp");
        var gifThree = $("<img>").attr("src", "./assets/image/onfiregif.webp");
        $("#insertTest").append(gifOne, gifTwo, gifThree);
       
        $("#iframeTest").attr("src", response.archived_snapshots.closest.url);
      })
      .catch(function (err) {
        console.log(`There was an error ${err.message}`);
        console.log(err);
      });
  }

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var searchInputUrl = $("#searchInputUrl").val().trim();
    var searchInputYear = $("#searchInputYear").val().trim();
    searchArchive(searchInputUrl, searchInputYear);
  });
});

$("#iframeTest").on("load", function () {
  $("#insertTest").empty();
  $("#gifLocation").empty();
});
